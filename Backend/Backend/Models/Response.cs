using System;
using System.Collections.Generic;
using System.Linq;
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

    }
}
