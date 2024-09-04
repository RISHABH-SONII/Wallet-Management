using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public List<Users> listUsers { get; set; }
        public Users user { get; set; }
        public List<Wallets> listWallets { get; set; }
        public Wallets wallet { get; set; }
        public List<Transections> listTransections { get; set; }
        public Transections transections { get; set; }
        public List<Transections> incomeList { get; set; }
        public List<Transections> expanseList { get; set; }
        public List<Category> categoryList { get; set; }
        public List<Notifications> notificationsList { get; set; }
        public string Token { get; set; }

    }
}
