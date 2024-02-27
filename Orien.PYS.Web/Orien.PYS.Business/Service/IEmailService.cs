﻿using Orien.PYS.Business.Models;

namespace Orien.PYS.Business.Service
{
    public interface IEmailService
    {
        public Task<bool> SendEmail(EmailBody emailBody);
        public Task<string> SendInviteEmail(InviteEmailBody emailBody);
    }
}
