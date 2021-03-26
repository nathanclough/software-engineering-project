using InnerCircleAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace InnerCircleAPI.Controllers.ServiceCommon
{
    public class Authorization
    {
        private readonly IConfiguration _config;
        private readonly InnerCircleDataContext _context;

        public Authorization(InnerCircleDataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public string GenerateJSONWebToken(Account userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("AccountID",userInfo.AccountId.ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
               claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Account AuthenticateUser(Account login)
        {
            // Return the acct obj if it exists else return null 
            var account = _context.Accounts.Include(a => a.Username)
                                           .Include(a => a.Password)
                                           .SingleOrDefault( a => a.Username.Value == login.Username.Value);

            if ( account == null || !BC.Verify(login.Password.Value, account.Password.Value))
            {
                return null; 
            }
            else
            {
                return account;
            }
        }
    }
}
