using InnerCircleAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Services
{
    public class RequestService
    {
        private readonly InnerCircleDataContext _context;
        public RequestService(InnerCircleDataContext context)
        {
            _context = context;
        }

        public void SaveRequest(RequestDTO requestDTO)
        {
            var sender = _context.Usernames.FirstOrDefault(u => u.AccountID == requestDTO.SenderId);
            var recepient = _context.Usernames.FirstOrDefault(u => u.AccountID == requestDTO.RecepientId);

            var request = new Request
            {
                RecepientId = requestDTO.RecepientId,
                SenderId = requestDTO.SenderId,
                Status = "Pending"
            };
            _context.Requests.Add(request);
            _context.SaveChanges();
        }
        
        // Gets Outgoing and Incoming requests for give user ID
        public List<RequestDTO> GetRequests(long userId)
        {
            var requests = _context.Requests.Select(r => new RequestDTO
            {
                SenderId = r.SenderId,
                RecepientId = r.RecepientId,
                Status = r.Status,
                RequestId = r.RequestId
                // Get pending requests involving the given user 
            }).Where(r => (r.SenderId == userId || r.RecepientId == userId) && r.Status == "Pending").ToList();
            
            foreach (var r in requests)
            {
                var recepient = _context.Usernames.FirstOrDefault(u => r.RecepientId == u.AccountID);
                var sender = _context.Usernames.FirstOrDefault(u => r.SenderId == u.AccountID);
                r.SenderUsername = sender.Value;
                r.RecepientUsername = recepient.Value;
            }
            return requests;
        }

        public void RespondToRequest(long requestID, string status)
        {
            var request = _context.Requests.FirstOrDefault(r => r.RequestId == requestID);
            request.Status = status;
            _context.Requests.Update(request);

            var SenderAccount = _context.Accounts.Include(a => a.Circle).FirstOrDefault(s => request.SenderId == s.AccountId);
            var RecipientAccount = _context.Accounts.Include(a => a.Circle).FirstOrDefault(rec => request.RecepientId == rec.AccountId);


            if (request.Status == "Accepted")
            {
                var SenderCircleMember = new CircleMember
                {
                    CircleId = RecipientAccount.Circle.CircleId,
                    AccountId = SenderAccount.AccountId
                };

                var RecipientCircleMember = new CircleMember
                {
                    CircleId = SenderAccount.Circle.CircleId,
                    AccountId = RecipientAccount.AccountId
                };

                _context.Add(SenderCircleMember);
                _context.Add(RecipientCircleMember);
            }
            _context.SaveChanges();
        }
    }
}
