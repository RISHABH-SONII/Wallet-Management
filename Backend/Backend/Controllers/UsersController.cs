﻿using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly string _connectionString = "";

        public UsersController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Default");
        }

        [HttpPost]
        [Route("registration")]
        public Response register(Users newUser)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.register(newUser, connection);
            return response;
        }

        [HttpPost]
        [Route("login")]
        public Response login(Users users) 
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.login(users, connection);
            return response;
        }

        //[HttpPost]
        //[Route("viewUser/{id}")]
        //public Response viewUser(int id)
        //{
        //    Response response = new Response();
        //    Dal dal = new Dal();
        //    SqlConnection connection = new SqlConnection(_connectionString);
        //    response = dal.viewUser(id, connection);
        //    return response;
        //}

        [HttpPost]
        [Route("editUser")]
        public Response editUser(Users users)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.editUser(users, connection);
            return response;
        }

        [HttpPost]
        [Route("addWallet")]
        public Response addWallet(Wallets wallets)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.addWallet(wallets, connection);
            return response;
        }

        //[HttpPost]
        //[Route("viewWallet")]
        //public Response viewWallet(Wallets wallets)
        //{
        //    Response response = new Response();
        //    Dal dal = new Dal();
        //    SqlConnection connection = new SqlConnection(_connectionString);
        //    response = dal.viewWallet(wallets, connection);
        //    return response;
        //}

        [HttpPost]
        [Route("editWallet")]
        public Response editWallet(Wallets wallets)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.editWallet(wallets,connection);
            return response;
        }

        [HttpPost]
        [Route("deleteWallet/{id}")]
        public Response deleteWallet(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.deleteWalletByID(id, connection);
            return response;
        }

        [HttpPost]
        [Route("addTransection")]
        public Response addTransection(Transections transection)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.addTransection(transection, connection);
            return response;
            }

        [HttpPost]
        [Route("editTransection")]
        public Response editTransection(Transections transections)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.editTransection(transections, connection);
            return response;
        }

        [HttpPost]
        [Route("deleteTransection")]
        public Response deleteTransection(Transections transection)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.deleteTransection(transection, connection);
            return response;
        }

        [HttpGet]
        [Route("showUsersList")]

        public Response showUsersList() 
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showUsersList(connection);
            return response;
        }

        [HttpGet]
        [Route("showUser/{id}")]
        public Response showUser(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showUserById(id,connection);
            return response;
        }

        [HttpGet]
        [Route("showWalletsList/{id}")]

        public Response showWalletsList(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showWalletsList(id,connection);
            return response;
        }

        [HttpGet]
        [Route("showWallet/{id}")]
        public Response showWallet(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showWalletById(id, connection);
            return response;
        }

        [HttpGet]
        [Route("showTransectionsList/{id}")]

        public Response showTransectionsList(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showTransectionsList(id, connection);
            return response;
        }

        [HttpGet]
        [Route("showTransection/{id}")]
        public Response showTransection(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showTransectionById(id, connection);
            return response;
        }

        [HttpGet]
        [Route("income/{id}")]
        public Response income(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showincomeById(id, connection);
            return response;
        }

        [HttpGet]
        [Route("expanse/{id}")]
        public Response expanse(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showexpanseById(id, connection);
            return response;
        }

        [HttpGet]
        [Route("category/{id}")]
        public Response category(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.showcategoryById(id, connection);
            return response;
        }

        [HttpGet]
        [Route("notifications/{id}")]
        public Response notifications(int id)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.shownotificationsByID(id, connection);
            return response;
        }




































        //[HttpGet]
        //[Route("GetUsers")]
        //public List<Users> GetUsers()
        //{
        //    var users = new List<Users>();

        //    using (SqlConnection connection = new SqlConnection(_connectionString))
        //    {
        //        connection.Open();
        //        using (SqlCommand command = connection.CreateCommand())
        //        {
        //            command.CommandText = "SELECT * FROM Users";

        //            using (SqlDataReader dr = command.ExecuteReader())
        //            {
        //                while (dr.Read())
        //                {
        //                    var user = new Users
        //                    {
        //                        UserId = (int)dr["UserID"],
        //                        Username = dr["Username"].ToString(),
        //                        Email = dr["Email"].ToString(),
        //                        Password = dr["Password"].ToString(),
        //                        FirstName = dr["FirstName"].ToString(),
        //                        LastName = dr["LastName"].ToString(),
        //                        CreatedAt = (DateTime)dr["CreatedAt"],
        //                        UpdatedAt = (DateTime)dr["UpdatedAt"],
        //                    };
        //                    users.Add(user);
        //                }
        //            }
        //        }
        //    }
        //    return users;
        //}
    }
}
//{
//    connection.Open();
//    using (SqlCommand command = connection.CreateCommand())
//    {
//        // SQL query to insert a new user
//        command.CommandText = @"
//                        INSERT INTO Users (Username, Email, Password, FirstName, LastName, CreatedAt, UpdatedAt)
//                        VALUES (@Username, @Email, @Password, @FirstName, @LastName, @CreatedAt, @UpdatedAt);
//                        SELECT SCOPE_IDENTITY();";


//        command.Parameters.AddWithValue("@Username", newUser.Username);
//        command.Parameters.AddWithValue("@Email", newUser.Email);
//        command.Parameters.AddWithValue("@Password", newUser.Password);
//        command.Parameters.AddWithValue("@FirstName", newUser.FirstName);
//        command.Parameters.AddWithValue("@LastName", newUser.LastName);
//        command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
//        command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);


//        int newUserId = Convert.ToInt32(command.ExecuteScalar());
//        newUser.UserId = newUserId;

//        return Ok(newUser);
//    }
//}