create Database if note exists EventManagementSystem;
Use EventManagementSystem;
CREATE TABLE [Users] (
  [User_id] integer(PK) NOT NULL,
  [First_name] nvarchar(255) NOT NULL,
  [Last_name] nvarchar(255) NOT NULL,
  [User_email] nvarchar(255) NOT NULL,
  [Phone_number] nvarchar(255) NOT NULL,
  [User_role] nvarchar(255) NOT NULL,
  [User_password] nvarchar(255) NOT NULL,
  [Created_at] datetime default(datetimeutcnow),
  [Status] nvarchar(255) NOT NULL,
  [Updated_at] datetime default(datetimeutcnow),
  [Last_login] datetime default(datetimeutcnow),
  [Update_by] nvarchar(255) NOT NULL,
  [Registration_date] datetime default(datetimeutcnow),
  [Created_by] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Event] (
  [Event_id] integer(PK) NOT NULL,
  [User_id] integer NOT NULL,
  [Category_id] integer NOT NULL,
  [Event_name] nvarchar(255) NOT NULL,
  [Location] nvarchar(255) NOT NULL,
  [Capacity] integer NOT NULL,
  [Event_description] nvarchar(255) NOT NULL,
  [Event_date] datetime default(datetimeutcnow),
  [Created_at] datetime default(datetimeutcnow),
  [updated_at] datetime default(datetimeutcnow),
  [Created_by] nvarchar(255) NOT NULL,
  [Updated_by] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Roles] (
  [Role_id] integer(PK) NOT NULL,
  [User_id] integer NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Created_by] nvarchar(255) NOT NULL,
  [Updated_by] nvarchar(255) NOT NULL,
  [Created_at] datetime default(datetimeutcnow),
  [updated_at] datetime default(datetimeutcnow)
)
GO

CREATE TABLE [Categories] (
  [Category_id] integer(PK) NOT NULL,
  [Category_name] nvarchar(255) NOT NULL,
  [Created_by] nvarchar(255) NOT NULL,
  [Updated_by] nvarchar(255) NOT NULL,
  [Created_at] datetime default(datetimeutcnow),
  [updated_at] datetime default(datetimeutcnow)
)
GO

CREATE TABLE [payment] (
  [Payment_id] integer(PK) NOT NULL,
  [User_id] integer NOT NULL,
  [Event_id] integer NOT NULL,
  [payment_method] nvarchar(255),
  [Ticket_Number] nvarchar,
  [Created_by] nvarchar,
  [Updated_by] nvarchar,
  [created_at] datetime default(datetimeutcnow),
  [updated_at] datetime default(datetimeutcnow)
)
GO

CREATE TABLE [Event_Tags] (
  [Tag_id] integer,
  [Event_id] integer NOT NULL,
  [Tag_name] nvarchar NOT NULL,
  [Created_by] nvarchar NOT NULL,
  [Updated_by] nvarchar NOT NULL,
  [created_at] datetime default(datetimeutcnow),
  [Updated_at] datetime default(datetimeutcnow)
)
GO

CREATE TABLE [Tickets] (
  [Ticket_id] integer(pk) NOT NULL,
  [Event_id] integer NOT NULL,
  [Payment_id] integer NOT NULL,
  [User_id] integer NOT NULL,
  [Ticket_type] nvarchar NOT NULL,
  [Created_by] nvarchar NOT NULL,
  [Updated_by] nvarchar NOT NULL,
  [Created_at] datetime default(datetimeutcnow),
  [Updated_at] datetime default(datetimeutcnow)
)
GO

CREATE TABLE [Registration] (
  [Registration_id] integer(pk) NOT NULL,
  [Event_id] integer NOT NULL,
  [User_id] integer NOT NULL,
  [Registration_date] datetime,
  [Payment_status] nvarchar NOT NULL,
  [Created_by] nvarchar NOT NULL,
  [Updated_by] nvarchar NOT NULL,
  [Created_at] datetime default(datetimeutcnow),
  [Updated_at] datetime default(datetimeutcnow)
)
GO

CREATE TABLE [Event_analysis] (
  [Event_id] integer NOT NULL,
  [Paid_attendees] integer NOT NULL,
  [Not_paid_attendees] nvarchar NOT NULL,
  [Payment_received] nvarchar NOT NULL,
  [Created_by] nvarchar NOT NULL,
  [Updated_by] nvarchar NOT NULL,
  [Created_at] datetime default(datetimeutcnow),
  [Updated_at] datetime default(datetimeutcnow),
  [Remaining_slots] integer
)
GO

CREATE TABLE [Feedback] (
  [Feedback_id] integer(pk) NOT NULL,
  [User_id] integer NOT NULL,
  [Event_id] integer NOT NULL,
  [Reviews] nvarchar,
  [Rating] integer,
  [Comments] nvarchar,
  [Like] integer,
  [shares] integer,
  [Created_by] nvarchar NOT NULL,
  [Updated_by] nvarchar NOT NULL,
  [Created_at] datetime default(datetimeutcnow),
  [Updated_at] datetime default(datetimeutcnow)
)
GO

CREATE TABLE [Chat_Messages] (
  [Message_id] integer(pk) NOT NULL,
  [Sender_id] integer NOT NULL,
  [Receiver_id] integer NOT NULL,
  [Message_content] nvarchar NOT NULL,
  [Created_by] nvarchar NOT NULL,
  [Updated_by] nvarchar NOT NULL,
  [Created_at] datetime default(datetimeutcnow),
  [Updated_at] datetime default(datetimeutcnow)
)
GO

ALTER TABLE [Event] ADD FOREIGN KEY ([User_id]) REFERENCES [Users] ([User_id])
GO

ALTER TABLE [Event] ADD FOREIGN KEY ([Category_id]) REFERENCES [Categories] ([Category_id])
GO

ALTER TABLE [Roles] ADD FOREIGN KEY ([User_id]) REFERENCES [Users] ([User_id])
GO

ALTER TABLE [payment] ADD FOREIGN KEY ([User_id]) REFERENCES [Users] ([User_id])
GO

ALTER TABLE [payment] ADD FOREIGN KEY ([Event_id]) REFERENCES [Event] ([Event_id])
GO

ALTER TABLE [Event_Tags] ADD FOREIGN KEY ([Event_id]) REFERENCES [Event] ([Event_id])
GO

ALTER TABLE [Tickets] ADD FOREIGN KEY ([Event_id]) REFERENCES [Event] ([Event_id])
GO

ALTER TABLE [Tickets] ADD FOREIGN KEY ([Payment_id]) REFERENCES [payment] ([Payment_id])
GO

ALTER TABLE [Tickets] ADD FOREIGN KEY ([User_id]) REFERENCES [Users] ([User_id])
GO

ALTER TABLE [Registration] ADD FOREIGN KEY ([Event_id]) REFERENCES [Event] ([Event_id])
GO

ALTER TABLE [Registration] ADD FOREIGN KEY ([User_id]) REFERENCES [Users] ([User_id])
GO

ALTER TABLE [Event_analysis] ADD FOREIGN KEY ([Event_id]) REFERENCES [Event] ([Event_id])
GO

ALTER TABLE [Feedback] ADD FOREIGN KEY ([User_id]) REFERENCES [Users] ([User_id])
GO

ALTER TABLE [Feedback] ADD FOREIGN KEY ([Event_id]) REFERENCES [Event] ([Event_id])
GO

ALTER TABLE [Chat_Messages] ADD FOREIGN KEY ([Sender_id]) REFERENCES [Users] ([User_id])
GO

ALTER TABLE [Chat_Messages] ADD FOREIGN KEY ([Receiver_id]) REFERENCES [Users] ([User_id])
GO
