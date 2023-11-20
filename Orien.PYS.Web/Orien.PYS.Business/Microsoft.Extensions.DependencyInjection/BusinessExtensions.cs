using Microsoft.Extensions.DependencyInjection;
using Orien.PYS.Business.Service;
using Orien.PYS.Business.Service.Implementation;

namespace Orien.PYS.Business.Microsoft.Extensions.DependencyInjection
{
    public static class BusinessExtensions
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<ISlipTransactionService, SlipTransactionService>();
            return services;
        }
    }
}
