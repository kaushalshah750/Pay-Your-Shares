using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreditCardController : ControllerBase
    {
        private readonly ICreditCardService creditCardService;

        public CreditCardController(ICreditCardService creditCardService)
        {
            this.creditCardService = creditCardService;
        }

        [HttpGet]
        public List<Credit_Card> GetCreditCardList()
        {
            return this.creditCardService.GetCreditCardList();
        }

        [HttpGet("Statement")]
        public List<CreditCardStatementVM> GetCreditCardStatementList()
        {
            return this.creditCardService.GetCreditCardStatementList();
        }
    }
}
