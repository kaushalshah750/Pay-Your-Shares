using Orien.PYS.Data;

namespace Orien.PYS.Business.Service.Implementation
{
    public class CommonService : ICommonService
    {
        private readonly OrienPYSDbContext orienPYSDbContext;

        public CommonService(
            OrienPYSDbContext orienPYSDbContext
            )
        {
            this.orienPYSDbContext = orienPYSDbContext;
        }


        public string GenerateUniqueRandomNumber()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[25];
            var random = new Random();
            var isUnique = false;
            string finalString = "";

            // Loop until a unique string is generated
            while (!isUnique)
            {
                for (int i = 0; i < stringChars.Length; i++)
                {
                    stringChars[i] = chars[random.Next(chars.Length)];
                }

                finalString = new String(stringChars);

                // Check if the generated string already exists in the database
                var groupExists = this.orienPYSDbContext.Groups.FirstOrDefault(g => g.UId == finalString);

                // If the string does not exist in the database, set isUnique to true to exit the loop
                if (groupExists == null)
                {
                    isUnique = true;
                }
            }

            return finalString;
        }
    }
}
