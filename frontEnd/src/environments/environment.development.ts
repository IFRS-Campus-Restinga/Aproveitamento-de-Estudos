export const environment = {
  production: false,
  authorize_uri: 'http://localhost:8080/oauth2/authorize?',
  client_id: 'client',
  redirect_uri: 'http://127.0.0.1:4200/authorized',
  scope:'openid profile',
  response_type: 'code',
  response_mode: 'form_post',
  code_challenge_method: 'S256',
  code_challenge:'EbOg70dFQoN3hXKhz6skoWtbi1IN5frHiyrHSiZPBYk',
  code_verifier: 'AmnyX1kD8G0emvxsCDGv5JbGX80KIhZz2fkKcVclAk7',
  token_url: "http://localhost:8080/oauth2/token",
  grant_type: 'authorization_code',
  resource_url: 'http://localhost:8080/resource/'

};
