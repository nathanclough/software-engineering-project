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
        public IActionResult Login([FromBody] AccountDTO creds)
        {
            var login = new Account
            {
                Username = new Username { Value = creds.Username },
                Password = new Password { Value = creds.Password }
            };
            IActionResult response = Unauthorized();
            var user = _authManager.AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = _authManager.GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        
    }
}