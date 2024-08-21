using Backend.Models;
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

        [HttpPost]
        [Route("viewUser")]

        public Response viewUser(Users users)
        {
            Response response = new Response();
            Dal dal = new Dal();
            SqlConnection connection = new SqlConnection(_connectionString);
            response = dal.viewUser(users, connection);
            return response;
        }

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