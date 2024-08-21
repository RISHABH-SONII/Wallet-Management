using System.Data;
using System.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;

namespace Backend.Models
{
    public class Dal
    {
        public Response register(Users newUser, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"
                        INSERT INTO Users (FirstName, LastName, Password, Email, Role, CreatedAt, UpdatedAt)
                        VALUES (@FirstName, @LastName, @Password, @Email, @Role, @CreatedAt, @UpdatedAt);
                        SELECT SCOPE_IDENTITY();";


            command.Parameters.AddWithValue("@FirstName", newUser.FirstName);
            command.Parameters.AddWithValue("@LastName", newUser.LastName);
            command.Parameters.AddWithValue("@Password", newUser.Password);
            command.Parameters.AddWithValue("@Email", newUser.Email);
            command.Parameters.AddWithValue("@Role", newUser.Role);
            command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);

            connection.Open();
            int i = Convert.ToInt32(command.ExecuteScalar());
            newUser.UserId = i;
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User registered succesfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User registration failed";
            }
            return response;
        }

        public Response login(Users Users, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM Users WHERE UserID = @UserID and Password = @UserPassword";
            command.Parameters.AddWithValue("@UserID", Users.UserId);
            command.Parameters.AddWithValue("UserPassword", Users.Password);

            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);
            Users User = new Users();
            if(dataTable.Rows.Count > 0)
            {
                User.UserId = Convert.ToInt32(dataTable.Rows[0]["UserID"]);
                User.FirstName = Convert.ToString(dataTable.Rows[0]["FirstName"]);
                User.LastName = Convert.ToString(dataTable.Rows[0]["LastName"]);
                User.Email = Convert.ToString(dataTable.Rows[0]["Email"]);
                User.Role = Convert.ToString(dataTable.Rows[0]["Role"]);
                response.StatusCode = 200;
                response.StatusMessage = "User Is Valid";
                response.user = User;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User is Invalid";
                response.user = null;
            }
            return response;
        }

        public Response viewUser(Users Users, SqlConnection connection) 
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "select * from Users where UserID = @UserId";
            command.Parameters.AddWithValue("@UserId",Users.UserId);

            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);

            Users User = new Users();
            if (dataTable.Rows.Count > 0)
            {
                User.UserId = Convert.ToInt32(dataTable.Rows[0]["UserID"]);
                User.FirstName = Convert.ToString(dataTable.Rows[0]["FirstName"]);
                User.LastName = Convert.ToString(dataTable.Rows[0]["LastName"]);
                User.Password = Convert.ToString(dataTable.Rows[0]["Password"]);
                User.Email = Convert.ToString(dataTable.Rows[0]["Email"]);
                User.Role = Convert.ToString(dataTable.Rows[0]["Role"]);
                User.CreatedAt = Convert.ToDateTime(dataTable.Rows[0]["CreatedAt"]);
                User.UpdatedAt = Convert.ToDateTime(dataTable.Rows[0]["UpdatedAt"]);
                response.StatusCode = 200;
                response.StatusMessage = "User exists";
                response.user = User;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User does not exists";
                response.user = null;
            }
            return response;
        }

        public Response editUser(Users users,SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"UPDATE Users SET FirstName = @FirstName, LastName = @LastName, Password = @Password, Email = @Email WHERE UserID = @UserID;";
            command.Parameters.AddWithValue("@UserID", users.UserId);
            command.Parameters.AddWithValue("@FirstName", users.FirstName);
            command.Parameters.AddWithValue("@LastName", users.LastName);
            command.Parameters.AddWithValue("@Password", users.Password);
            command.Parameters.AddWithValue("@Email", users.Email);
            //command.Parameters.AddWithValue("@Role", users.Role);
            //command.Parameters.AddWithValue("@CreatedAt", users.CreatedAt);
            //command.Parameters.AddWithValue("@UpdatedAt", users.UpdatedAt);

            connection.Open();
            int i = command.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Record Updated Successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured. Try after sometime.";
                response.user = null;
            }
            return response;
        }
    }
}
