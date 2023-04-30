module.exports = (conn) => {
    return conn.model(
      'EmailTemplate',
      {
        name: String,
        from: String,
        subject: String,
        body: String,
        emailType: String,
        emailCc: Array,
        emailBcc: Array,
        status: String,
        active: Boolean,
        createdOn: Date,
        updatedOn: Date,
        lastPublishedOn: Date,
      },
      'email-templates'
    );
  };
  