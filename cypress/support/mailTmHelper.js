const MAILTM_BASE = 'https://api.mail.tm';

export const createMailTmAccount = () => {
  const username = `org${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const password = 'Password123!';

  return cy.request(`${MAILTM_BASE}/domains`).then((res) => {
    const domain = res.body['hydra:member'][0].domain;
    const address = `${username}@${domain}`;

    return cy.request({
      method: 'POST',
      url: `${MAILTM_BASE}/accounts`,
      body: { address, password },
      failOnStatusCode: false
    }).then((resCreate) => {
      if ([201, 409, 422].includes(resCreate.status)) {
        return cy.request({
          method: 'POST',
          url: `${MAILTM_BASE}/token`,
          body: { address, password },
          failOnStatusCode: false
        }).then((resLogin) => {
          if (resLogin.status === 200 && resLogin.body.token) {
            return {
              address,
              password,
              token: resLogin.body.token
            };
          } else {
            throw new Error('No se pudo obtener token para cuenta Mail.tm');
          }
        });
      } else {
        throw new Error('Error inesperado al crear cuenta en Mail.tm');
      }
    });
  });
};

export const waitForMail = (token, subject, maxRetries = 3, interval = 3000) => {
  let attempt = 0;

  const checkMail = () => {
    return cy.request({
      method: 'GET',
      url: `${MAILTM_BASE}/messages`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const message = res.body['hydra:member'].find((msg) =>
        msg.subject.includes(subject)
      );
      const messageSubjects = res.body['hydra:member'].map(m => m.subject);
      console.log('Asuntos recibidos:', messageSubjects);


      if (message) {
        return message.id;
      }

      if (attempt++ < maxRetries) {
        return cy.wait(interval).then(checkMail);
      }

      throw new Error('No se recibió el mail en el tiempo esperado');
    });
  };

  return checkMail();
};

export const getActivationLink = (token, messageId) => {
  return cy.request({
    method: 'GET',
    url: `${MAILTM_BASE}/messages/${messageId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    const html = res.body.html[0];
    const match = html.match(/https?:\/\/[^\s"]+/);
    if (match) {
      return match[0];
    }
    throw new Error('No se encontró enlace de activación en el correo');
  });
};
