using InnerCircleAPI.Models;
using InnerCircleAPI.Controllers.ServiceCommon;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
using InnerCircleAPI.Models.DTOs;

namespace InnerCircleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly Authorization _authManager;
        private readonly InnerCircleDataContext _context;

        public LoginController(InnerCircleDataContext context, IConfiguration config, Authorization authManager)
        {
            _context = context;
            _authManager = authManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] AccountDTO loginCreds)
        {
            var loginAccount = new Account
            {
                Username = new Username { Value = loginCreds.Username },
                Password = new Password { Value = loginCreds.Password }
            };
            
            var authorizedAcct = _authManager.AuthenticateUser(loginAccount);
            // set the response to unauthorized as default 
            IActionResult response = Unauthorized();

            // If the authorizedAcct is not null then it was authenticated so set new response 
            if (authorizedAcct != null)
            {
                var accountDto = new AccountDTO
                {
                    AccountId = authorizedAcct.AccountId,
                    Username = authorizedAcct.Username.Value,
                    FirstName = authorizedAcct.FirstName,
                    LastName = authorizedAcct.LastName,
                    Email = authorizedAcct.Email.Value
                };

                var tokenString = _authManager.GenerateJSONWebToken(authorizedAcct);
                response = Ok(new { token = tokenString , account = accountDto });
            }

            return response;
        }

        
    }
}