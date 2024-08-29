using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace Backend.Models
{
    public class Dal
    {

        public Response register(Users newUser, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"
                        INSERT INTO Users (FirstName, LastName, Password, Email, CreatedAt, UpdatedAt)
                        VALUES (@FirstName, @LastName, @Password, @Email, @CreatedAt, @UpdatedAt);
                        SELECT SCOPE_IDENTITY();";


            command.Parameters.AddWithValue("@FirstName", newUser.FirstName);
            command.Parameters.AddWithValue("@LastName", newUser.LastName);
            command.Parameters.AddWithValue("@Password", newUser.Password);
            command.Parameters.AddWithValue("@Email", newUser.Email);
            command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);

            connection.Open();
            try { 
            int i = Convert.ToInt32(command.ExecuteScalar());
            newUser.UserId = i;
                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "User registered succesfully";
                    response.user = newUser;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "User registration failed";
                }
            }
            catch { 
            response.StatusCode = 100;
            response.StatusMessage = "Email address is already exists. Use another";
            }
            connection.Close();
            return response;
        }
        public Response login(Users user, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM Users WHERE Email = @EmailID and Password = @UserPassword";
            command.Parameters.AddWithValue("@EmailID", user.Email);
            command.Parameters.AddWithValue("@UserPassword", user.Password);
            connection.Open();
            using (SqlDataReader reader = command.ExecuteReader())
            {
                if (reader.Read())
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("sE9k3q8Mgk3J3cI7vK7pFJ4YsK+Jg8W8M7E8gL1Jd3A=");
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                new Claim(ClaimTypes.Name, user.Email)

                            // Consider adding more claims here if needed
                        }),
                        Expires = DateTime.UtcNow.AddHours(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var tokenString = tokenHandler.WriteToken(token);

                    Users users = new Users();
                    users.UserId = (int)reader["UserID"];
                    users.FirstName = (string)reader["FirstName"];
                    users.LastName = (string)reader["LastName"];
                    users.Password = (string)reader["Password"];
                    users.Email = (string)reader["Email"];
                    users.CreatedAt = (DateTime)reader["CreatedAt"];
                    users.UpdatedAt = (DateTime)reader["UpdatedAt"];

                    response.StatusCode = 200;
                    response.StatusMessage = "User Is Valid";
                    response.user = users;
                    response.Token = tokenString;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "User is Invalid";
                    response.user = null;
                }
            }
            connection.Close();
            return response;
        }

        public Response viewUser(int id, SqlConnection connection) 
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "select * from Users where UserID = @UserId";
            command.Parameters.AddWithValue("@UserId",id);
            connection.Open();
            using(SqlDataReader reader =  command.ExecuteReader()) 
            {
                Users User = new Users();
                if (reader.Read())
                {
                    User.UserId = Convert.ToInt32(reader["UserID"]);
                    User.FirstName = Convert.ToString(reader["FirstName"]);
                    User.LastName = Convert.ToString(reader["LastName"]);
                    User.Password = Convert.ToString(reader["Password"]);
                    User.Email = Convert.ToString(reader["Email"]);
                    User.CreatedAt = Convert.ToDateTime(reader["CreatedAt"]);
                    User.UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"]);
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
            }
            connection.Close();
            return response;
        }
        public Response editUser(Users users,SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"UPDATE Users SET FirstName = @FirstName, LastName = @LastName, Password = @Password, Email = @Email, UpdatedAt = @UpdatedAt WHERE UserID = @UserID;";
            command.Parameters.AddWithValue("@UserID", users.UserId);
            command.Parameters.AddWithValue("@FirstName", users.FirstName);
            command.Parameters.AddWithValue("@LastName", users.LastName);
            command.Parameters.AddWithValue("@Password", users.Password);
            command.Parameters.AddWithValue("@Email", users.Email);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);

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
            }
            return response;
        }
        public Response addWallet(Wallets wallets, SqlConnection connection)
        {
            Response response = new Response();
            try
            {
                SqlCommand command = connection.CreateCommand();
                command.CommandText = @"
                        INSERT INTO Wallets (UserID, Name, Type, InitialBalance, CreatedAt, UpdatedAt)
                        VALUES (@UserID, @Name, @Type, @InitialBalance, @CreatedAt, @UpdatedAt);
                        SELECT SCOPE_IDENTITY();";


                command.Parameters.AddWithValue("@UserID", wallets.UserID);
                command.Parameters.AddWithValue("@Name", wallets.Name);
                command.Parameters.AddWithValue("@Type", wallets.Type);
                command.Parameters.AddWithValue("@InitialBalance", wallets.InitialBalance);
                command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
                command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);

                connection.Open();
                int i = Convert.ToInt32(command.ExecuteScalar());
                wallets.WalletID = i;
                connection.Close();

                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "New wallet created succesfully";
                }
            }
            catch 
            {
                    response.StatusCode = 100;
                    response.StatusMessage = "This named wallet is already created";
            }
            
            return response;
        }
        public Response viewWallet(Wallets wallets, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "select * from Wallets where UserID = @UserId";
            command.Parameters.AddWithValue("@UserId", wallets.UserID );

            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);

            Wallets Wallet = new Wallets();
            if (dataTable.Rows.Count > 0)
            {
                Wallet.WalletID = Convert.ToInt32(dataTable.Rows[0]["WalletID"]);
                Wallet.UserID = Convert.ToInt32(dataTable.Rows[0]["UserID"]);
                Wallet.Name = Convert.ToString(dataTable.Rows[0]["Name"]);
                Wallet.Type = Convert.ToString(dataTable.Rows[0]["Type"]);
                Wallet.InitialBalance = Convert.ToDecimal(dataTable.Rows[0]["InitialBalance"]);
                Wallet.CreatedAt = Convert.ToDateTime(dataTable.Rows[0]["CreatedAt"]);
                Wallet.UpdatedAt = Convert.ToDateTime(dataTable.Rows[0]["UpdatedAt"]);
                response.StatusCode = 200;
                response.StatusMessage = "Wallet Details Fetched";
                response.wallet = Wallet;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User does not exists";
                response.wallet = null;
            }
            return response;
        }
        public Response editWallet(Wallets wallets, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"UPDATE Wallets SET Name = @WalletName, Type = @WalletType, InitialBalance = @CurrentBalance, UpdatedAt = @UpdatedAt WHERE WalletID = @walletID;";
            command.Parameters.AddWithValue("@walletID", wallets.WalletID);
            command.Parameters.AddWithValue("@WalletName", wallets.Name);
            command.Parameters.AddWithValue("@WalletType", wallets.Type);
            command.Parameters.AddWithValue("@CurrentBalance", wallets.InitialBalance);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);

            connection.Open();
            int i = command.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Wallet Record Updated Successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured while updating wallet record. Try after sometime.";
            }
            return response;
        }
        public Response deleteWalletByID(int Walletid, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"Delete from Wallets where WalletID = @WalletID;";
            command.Parameters.AddWithValue("@WalletID", Walletid);

            connection.Open();
            int i = command.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Wallet deleted succesfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured while deleting the wallet. Try after sometime.";
            }
            return response;
        }
        public Response addTransection(Transections transections, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"
                        INSERT INTO Transections (WalletID, Amount, Date, Category, Notes, CreatedAt, UpdatedAt)
                        VALUES (@WalletID, @Amount, @Date, @Category, @Notes, @CreatedAt, @UpdatedAt);
                        SELECT SCOPE_IDENTITY();";


            command.Parameters.AddWithValue("@WalletID", transections.WalletID);
            command.Parameters.AddWithValue("@Amount", transections.Amount);
            command.Parameters.AddWithValue("@Date", transections.Date);
            command.Parameters.AddWithValue("@Category", transections.Category);
            command.Parameters.AddWithValue("@Notes", transections.Notes);
            command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);

            connection.Open();
            int i = Convert.ToInt32(command.ExecuteScalar());
            transections.WalletID = i;
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Transection recorder successfully.";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured while making new transection. Try after sometime.";
            }
            return response;
        }

        public Response viewTransection(Transections Transections, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "select * from Transections where WalletID = @WalletID";
            command.Parameters.AddWithValue("@WalletID", Transections.WalletID);

            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);

            Transections Transection = new Transections();
            if (dataTable.Rows.Count > 0)
            {
                Transection.TransectionID = Convert.ToInt32(dataTable.Rows[0]["TransectionID"]);
                Transection.WalletID = Convert.ToInt32(dataTable.Rows[0]["WalletID"]);
                Transection.Amount = Convert.ToDecimal(dataTable.Rows[0]["Amount"]);
                Transection.Date = Convert.ToDateTime(dataTable.Rows[0]["Date"]);
                Transection.Category = Convert.ToString(dataTable.Rows[0]["Category"]);
                Transection.Notes = Convert.ToString(dataTable.Rows[0]["Notes"]);
                Transection.CreatedAt = Convert.ToDateTime(dataTable.Rows[0]["CreatedAt"]);
                Transection.UpdatedAt = Convert.ToDateTime(dataTable.Rows[0]["UpdatedAt"]);
                response.StatusCode = 200;
                response.StatusMessage = "Transection Details Fetched";
                response.transections = Transection;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured while fetching transections record. Try after sometime.";
                response.transections = null;
            }
            return response;
        }
        public Response editTransection(Transections transections, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"UPDATE Transections SET Amount = @Amount, Date = @Date, Category = @Category, Notes = @Notes, UpdatedAt = @UpdatedAt WHERE WalletID = @WalletID;";
            command.Parameters.AddWithValue("@WalletID", transections.WalletID);
            command.Parameters.AddWithValue("@Amount", transections.Amount);
            command.Parameters.AddWithValue("@Date", transections.Date);
            command.Parameters.AddWithValue("@Category", transections.Category);
            command.Parameters.AddWithValue("@Notes", transections.Notes);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);

            connection.Open();
            int i = command.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Transection Record Updated Successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured while updating transection record. Try after sometime.";
            }
            return response;
        }
        public Response deleteTransection(Transections transections, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"Delete from Transections where WalletID = @WalletID;";
            command.Parameters.AddWithValue("@WalletID", transections.WalletID);

            connection.Open();
            int i = command.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Transection deleted succesfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured while deleting the transection. Try after sometime.";
            }
            return response;
        }

        public Response showUsersList(SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "Select * from Users";

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<Users> usersList = new List<Users>();

            while (reader.Read())
            {
                Users user = new Users
                { 
                    UserId = Convert.ToInt32(reader["UserID"]),
                    FirstName = Convert.ToString(reader["FirstName"]),
                    LastName = Convert.ToString(reader["LastName"]),
                    Password = Convert.ToString(reader["Password"]),
                    Email = Convert.ToString(reader["Email"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"])
                };

                usersList.Add(user);
            }

            connection.Close();

            if (usersList.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Users Retrieved successfully";
                response.listUsers = usersList;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No users found";
            }

            return response;
        }

        public Response showUserById(int userId, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"Select * from Users where UserID = @UserID;";
            command.Parameters.AddWithValue("@UserID", userId);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                reader.Read();
                Users userData = new Users
                {
                    UserId = Convert.ToInt32(reader["UserID"]),
                    FirstName = Convert.ToString(reader["FirstName"]),
                    LastName = Convert.ToString(reader["LastName"]),
                    Password = Convert.ToString(reader["Password"]),
                    Email = Convert.ToString(reader["Email"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"])
                };

                response.StatusCode = 200;
                response.StatusMessage = "User retrieved successfully";
                response.user = userData;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User not found";
            }

            reader.Close();
            connection.Close();

            return response;
        }
        public Response showWalletsList(int id,SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"Select * from Wallets Where UserID = @userId";
            command.Parameters.AddWithValue("@userId", id);

            connection.Open();
            List<Wallets> walletList = new List<Wallets>();
            SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Wallets wallet = new Wallets
                    {
                        WalletID = Convert.ToInt32(reader["WalletID"]),
                        UserID = Convert.ToInt32(reader["UserID"]),
                        Name = Convert.ToString(reader["Name"]),
                        Type = Convert.ToString(reader["Type"]),
                        InitialBalance = Convert.ToDecimal(reader["InitialBalance"]),
                        CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                        UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"])
                    };
                    walletList.Add(wallet);
                }

            connection.Close();

            if (walletList.Count > 0 )
            {
                response.StatusCode = 200;
                response.StatusMessage = "Wallets Retrieved successfully";
                response.listWallets = walletList;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No wallets found";
            }
            return response;
        }
        public Response showWalletById(int providedWalletId, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"Select * from Wallets where WalletID = @walletID;";
            command.Parameters.AddWithValue("@walletID", providedWalletId);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                reader.Read();
                Wallets walletData = new Wallets
                {
                    WalletID = Convert.ToInt32(reader["WalletID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    Name = Convert.ToString(reader["Name"]),
                    Type = Convert.ToString(reader["Type"]),
                    InitialBalance = Convert.ToDecimal(reader["InitialBalance"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"])
                };

                response.StatusCode = 200;
                response.StatusMessage = "Wallet details retrieved successfully";
                response.wallet = walletData;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Wallet not found";
            }

            reader.Close();
            connection.Close();
            return response;
        }
        public Response showTransectionsList(SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "Select * from Transections";

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<Transections> transectionList = new List<Transections>();

            while (reader.Read())
            {
                Transections transectionData = new Transections
                {
                    TransectionID = Convert.ToInt32(reader["TransectionID"]),
                    WalletID = Convert.ToInt32(reader["WalletID"]),
                    Amount = Convert.ToDecimal(reader["Amount"]),
                    Date = Convert.ToDateTime(reader["Date"]),
                    Category = Convert.ToString(reader["Category"]),
                    Notes = Convert.ToString(reader["Notes"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"])
                };
                transectionList.Add(transectionData);
            }

            connection.Close();

            if (transectionList.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Transections Retrieved successfully";
                response.listTransections = transectionList;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No transection found";
            }
            return response;
        }

        public Response showTransectionById(int transectionId,SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"Select * from Transections where TransectionID = @TransectionID;";
            command.Parameters.AddWithValue("@TransectionID", transectionId);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                reader.Read();
                Transections transectionData = new Transections
                {
                    TransectionID = Convert.ToInt32(reader["TransectionID"]),
                    WalletID = Convert.ToInt32(reader["WalletID"]),
                    Amount = Convert.ToDecimal(reader["Amount"]),
                    Date = Convert.ToDateTime(reader["Date"]),
                    Category = Convert.ToString(reader["Category"]),
                    Notes = Convert.ToString(reader["Notes"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"])
                };

                response.StatusCode = 200;
                response.StatusMessage = "Transection retrieved successfully";
                response.transections = transectionData;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Transection not found";
            }

            reader.Close();
            connection.Close();
            return response;
        }
    }
}
