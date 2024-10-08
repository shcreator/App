import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('39cd296e-2160-4738-8925-f2d269986776', '1Trudie.Lindgren@yahoo.com', 'Charlie Black', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv67890def', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('ce7318c8-b552-425d-9d13-5655f110110f', '10Dagmar_Frami50@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=12', 'inv12345abc', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('0a15b566-829b-40f0-aa19-fc0cbbf9e848', '28Christy.Hand@gmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=30', 'inv11223ghi', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('45da723d-4faf-454e-8781-bc4aee4bf898', '37Mathias.Dickinson91@yahoo.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=39', 'inv12345abc', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('0df1c90a-9d0a-4245-89f5-f4d43cf1f75f', '46Lance19@yahoo.com', 'Charlie Black', 'https://i.imgur.com/YfJQV5z.png?id=48', 'inv12345abc', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('27c1e30b-522c-462f-8ecb-aa92fb4b45a6', '55Edyth56@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=57', 'inv12345abc', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('9535aeb3-3361-429b-a779-45077a8d848d', '64Milton.Rau@hotmail.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=66', 'inv67890def', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('183bc1b0-6ac9-4a60-9d0e-1ed07e362c7a', '73Shanel.Leuschke20@hotmail.com', 'Charlie Black', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv67890def', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e47134d1-22d8-4dce-9b3d-dbfd9021649e', '82Jonathon.Macejkovic@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=84', 'inv78901mno', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('6f8d3194-df59-4299-812a-07540a3f1c33', '9f3a6b7d5c2e', '{"calcar":"aurum","voluntarius":"canis","pecto":"bellicus"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('ea60aded-613d-49dc-b96d-9dfdfcbdca8e', '9f3a6b7d5c2e', '{"triumphus":"summisse","unus":"ventito","tui":"summopere","acquiro":"delibero"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('712eba2a-00a2-4a31-b053-2425fd2d7281', 'b8d2f7a3c6e1', '{"possimus":"coerceo","sollicito":"taceo","officiis":"tergiversatio","complectus":"vesco"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('bacc0b77-c37e-4df0-9eae-aa463a5b64a0', 'b8d2f7a3c6e1', '{"conitor":"aurum","cribro":"cunctatio","atavus":"versus","iste":"culpo","verus":"ad"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('bd6a14b7-abcc-496f-b4b8-305aabfa58df', 'b8d2f7a3c6e1', '{"audax":"articulus","tabula":"clam","subnecto":"cubo"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('3504a0a2-1fd3-48e0-a5e2-2cdf951987d4', 'b8d2f7a3c6e1', '{"crudelis":"quae","cupiditate":"accusamus","apparatus":"supplanto","illum":"viduo","venio":"capillus"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('d27fe75e-6ca9-4bbf-ae3f-973941b8407f', 'e5c9a7b1d4f6', '{"civis":"unus","vae":"degero","aestas":"talis"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('ce562c26-6086-4e1d-951f-fd368322fb9c', 'b8d2f7a3c6e1', '{"verbera":"et","cogito":"nulla","tristis":"cibus","adaugeo":"cogito"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('74137cc3-1e94-4c0b-b1e0-6d8302c40c44', 'a7f4b2c9d1e8', '{"vere":"terra","spiritus":"subito","valde":"comitatus","copiose":"vicissitudo"}'::jsonb);
INSERT INTO "RagVector" ("id", "key", "tags") VALUES ('dc4530c5-0a0f-49a5-8ab6-f929b0989f22', 'c1e9f4b7d3a2', '{"vilitas":"aut","atrox":"tergeo","socius":"veritatis","coerceo":"adinventitias","cognomen":"terror"}'::jsonb);

INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('2312c860-b13e-4aaa-9a87-e074649ac128', 'httpsexample.comendpoint2', 'sub_1234567890abcdef', '0a15b566-829b-40f0-aa19-fc0cbbf9e848');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('56dc4616-ccd3-4029-aefb-e4334469c864', 'httpsexample.comendpoint5', 'sub_0987654321fedcba', '45da723d-4faf-454e-8781-bc4aee4bf898');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('2e09addc-e7dd-4b7b-a379-583305636ed6', 'httpsexample.comendpoint1', 'sub_fedcba0987654321', '45da723d-4faf-454e-8781-bc4aee4bf898');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('aa2ed931-867f-47c6-9c27-4164ec3c8b59', 'httpsexample.comendpoint5', 'sub_1122334455667788', '39cd296e-2160-4738-8925-f2d269986776');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('cbc1c8f4-e6f5-41c0-94cd-f117892ff586', 'httpsexample.comendpoint5', 'sub_abcdef1234567890', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('01b7e5b2-2fa2-4190-8d5d-e50a8b7d1d3a', 'httpsexample.comendpoint5', 'sub_0987654321fedcba', '0a15b566-829b-40f0-aa19-fc0cbbf9e848');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('f891517f-6942-4464-8f4f-45f0721e66c1', 'httpsexample.comendpoint1', 'sub_1122334455667788', 'ce7318c8-b552-425d-9d13-5655f110110f');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('4ba99c74-812f-41b5-ab56-91adf0fa1a8c', 'httpsexample.comendpoint2', 'sub_abcdef1234567890', 'ce7318c8-b552-425d-9d13-5655f110110f');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('00fa2937-817f-4add-95e1-64a929791a9e', 'httpsexample.comendpoint1', 'sub_1122334455667788', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('2ee14be5-a6fc-49f9-a2b8-a94c34e22433', 'httpsexample.comendpoint3', 'sub_abcdef1234567890', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('3e20a83e-d4d4-4035-9b33-cc26a699dbb1', 'Digital Art Pack', 'A collection of highresolution digital artworks.', 949, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=154');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('2dd2770f-09e9-431e-acf1-2d034c6c5055', 'Stock Photo Bundle', 'Advanced software for professional video editing.', 914, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=159');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('7a09cad7-0df0-4ab1-92d4-c2442f4fa8e9', 'Digital Art Pack', 'Advanced software for professional video editing.', 771, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=164');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('05d674eb-0d7e-43dd-b7b3-2e9ffea26a10', 'Music Production Kit', 'Essential tools and samples for music producers.', 243, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=169');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('a8039b37-a968-436d-90af-8e35f0f83a77', 'Ebook Collection', 'A comprehensive library of ebooks across various genres.', 429, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=174');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('cbbfe908-53ff-4490-aa63-0843a1fbf975', 'Ebook Collection', 'A comprehensive library of ebooks across various genres.', 119, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=179');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('f65c28fb-04a5-41e3-aeb4-89dad5117afb', 'Stock Photo Bundle', 'A comprehensive library of ebooks across various genres.', 898, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=184');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('1b518411-7c25-477d-a5f0-86689323ffc5', 'Stock Photo Bundle', 'Advanced software for professional video editing.', 463, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=189');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('d12d2edc-3b8a-484a-9a39-5c589fa52559', 'Video Editing Software', 'A comprehensive library of ebooks across various genres.', 421, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=194');
INSERT INTO "Product" ("id", "name", "description", "price", "fileUrl") VALUES ('8e73aa0f-32b3-4c8a-83bc-3ac386a96040', 'Stock Photo Bundle', 'Essential tools and samples for music producers.', 154, 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=199');

INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('8df5c5da-e246-4e93-8a75-28177b0858a6', 459, '2025-06-22T13:53:07.413Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '8e73aa0f-32b3-4c8a-83bc-3ac386a96040');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('b27b78e0-0c78-44d1-9949-e713994ae3e8', 393, '2024-11-21T04:03:11.191Z', '0a15b566-829b-40f0-aa19-fc0cbbf9e848', 'd12d2edc-3b8a-484a-9a39-5c589fa52559');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('6a32a12e-42ca-4443-8e9a-65d54fa97e18', 115, '2024-08-07T10:17:50.039Z', '27c1e30b-522c-462f-8ecb-aa92fb4b45a6', 'd12d2edc-3b8a-484a-9a39-5c589fa52559');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('5211e71a-7fab-4143-b191-3d328610b80d', 316, '2025-03-30T12:24:01.904Z', '183bc1b0-6ac9-4a60-9d0e-1ed07e362c7a', 'f65c28fb-04a5-41e3-aeb4-89dad5117afb');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('c0237e97-96b6-4732-be49-b6fda49de7c7', 340, '2025-09-13T14:09:35.440Z', 'e47134d1-22d8-4dce-9b3d-dbfd9021649e', '05d674eb-0d7e-43dd-b7b3-2e9ffea26a10');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('41f32afe-7d8b-49e1-b7e5-fda772b01068', 93, '2025-10-06T00:13:36.205Z', '0df1c90a-9d0a-4245-89f5-f4d43cf1f75f', '3e20a83e-d4d4-4035-9b33-cc26a699dbb1');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('8962e360-2dd4-44e1-9745-eafe0c6f88c7', 396, '2025-03-24T18:14:48.040Z', '39cd296e-2160-4738-8925-f2d269986776', 'a8039b37-a968-436d-90af-8e35f0f83a77');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('c17a5c37-4aef-4a73-9609-87090112c8bc', 889, '2023-10-20T04:32:56.310Z', '45da723d-4faf-454e-8781-bc4aee4bf898', '1b518411-7c25-477d-a5f0-86689323ffc5');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('67df20af-c88e-4d40-b6b7-91d5333fe528', 628, '2024-06-28T18:44:19.708Z', 'e47134d1-22d8-4dce-9b3d-dbfd9021649e', 'cbbfe908-53ff-4490-aa63-0843a1fbf975');
INSERT INTO "Purchase" ("id", "price", "purchaseDate", "userId", "productId") VALUES ('811357d6-34fd-492e-9313-62a1f0df01b2', 507, '2024-11-20T06:26:15.245Z', '27c1e30b-522c-462f-8ecb-aa92fb4b45a6', '7a09cad7-0df0-4ab1-92d4-c2442f4fa8e9');

INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('5356c292-3ce7-49c8-9c04-e8f2c0ddc5bc', 233, 'transfer', '2024-04-17T04:04:52.240Z', 'ce7318c8-b552-425d-9d13-5655f110110f');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('2da1d962-2071-4f5d-a21c-ac82c8cf17a0', 321, 'purchase', '2024-09-21T17:51:42.079Z', '183bc1b0-6ac9-4a60-9d0e-1ed07e362c7a');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('b0646125-e57e-4266-8a3d-0e5fc9421c3c', 625, 'refund', '2024-09-14T11:16:41.437Z', '0df1c90a-9d0a-4245-89f5-f4d43cf1f75f');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('640f9681-a3d5-49f0-ad5d-d9121803e2eb', 540, 'purchase', '2024-03-05T12:32:47.207Z', '183bc1b0-6ac9-4a60-9d0e-1ed07e362c7a');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('aa196985-84a8-4c16-89ec-8171be4c436a', 383, 'withdrawal', '2024-08-09T05:24:02.777Z', '45da723d-4faf-454e-8781-bc4aee4bf898');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('e7eb1afc-319e-4eb2-9366-0b1081ba80be', 671, 'refund', '2025-09-11T18:33:57.014Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('a0ef3d3e-b02b-4120-a384-1a8080a63f51', 537, 'refund', '2024-12-09T10:59:31.843Z', '39cd296e-2160-4738-8925-f2d269986776');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('ebf29b9d-53bf-4967-920a-3b70f5ae0d36', 879, 'refund', '2024-01-09T21:46:19.711Z', 'e47134d1-22d8-4dce-9b3d-dbfd9021649e');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('96c5b4c5-c400-4206-b9ef-3a4330c78d89', 626, 'withdrawal', '2024-01-14T14:43:20.561Z', '183bc1b0-6ac9-4a60-9d0e-1ed07e362c7a');
INSERT INTO "WalletTransaction" ("id", "amount", "transactionType", "transactionDate", "userId") VALUES ('3844a9c6-c333-48d0-b7ff-802b722ce37e', 770, 'topup', '2023-10-10T01:55:35.094Z', '0df1c90a-9d0a-4245-89f5-f4d43cf1f75f');

INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('16525d9f-ae45-4268-b505-bf4f99629efe', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=271', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=272', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('58f7ffe9-eb26-4bf9-a3c3-4494df2acee7', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=274', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=275', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('06fc65c9-25d2-42a6-96e6-833fb4a5288d', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=277', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=278', '39cd296e-2160-4738-8925-f2d269986776');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('56e781d5-e06a-4c1e-9f3a-81da301eae25', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=280', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=281', 'ce7318c8-b552-425d-9d13-5655f110110f');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('c76037fc-755d-46ed-8fa2-d01600c14c27', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=283', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=284', 'e47134d1-22d8-4dce-9b3d-dbfd9021649e');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('16f25c39-e50c-4474-8f1b-9c9b38ab5ab9', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=286', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=287', '183bc1b0-6ac9-4a60-9d0e-1ed07e362c7a');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('064cc92b-a609-4ea3-bea9-26c4fddf8cc8', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=289', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=290', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('cf242365-bee9-4311-85b6-b9c6f6e2ce48', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=292', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=293', '0df1c90a-9d0a-4245-89f5-f4d43cf1f75f');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('5541dd18-d6f0-46b8-8f22-10c1d084d730', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=295', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=296', 'e47134d1-22d8-4dce-9b3d-dbfd9021649e');
INSERT INTO "UploadedDocument" ("id", "fileUrl", "fileName", "userId") VALUES ('5f5f31a3-ab96-4ef8-804f-8696bb7266e9', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=298', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=299', 'e47134d1-22d8-4dce-9b3d-dbfd9021649e');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
