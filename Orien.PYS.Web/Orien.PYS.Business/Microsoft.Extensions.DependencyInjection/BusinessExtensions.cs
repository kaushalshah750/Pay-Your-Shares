using Microsoft.Extensions.DependencyInjection;
using Orien.PYS.Business.Service;
using Orien.PYS.Business.Service.Implementation;

namespace Orien.PYS.Business.Microsoft.Extensions.DependencyInjection
{
    public static class BusinessExtensions
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ICreditCardService, CreditCardService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<ISlipTransactionService, SlipTransactionService>();
            services.AddScoped<ISMSService, SMSService>();
            services.AddScoped<IUserService, UserService>();
            return services;
        }
    }
}
