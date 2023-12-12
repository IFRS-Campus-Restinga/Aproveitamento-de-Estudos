use devii;

select * from role;
select * from usuario_role;
select * from usuario;
select * from google_user;

select * from client;
select * from client_authorization_grant_types;
select * from client_client_authentication_methods_set;
select * from client_redirect_uris;
select * from client_scopes;

UPDATE client_redirect_uris set redirect_uris = 'http://127.0.0.1:4200/authorized'  WHERE client_id = 1
