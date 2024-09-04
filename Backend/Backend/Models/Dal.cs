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

        //Add Api's
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
        public Response addWallet(Wallets wallets, SqlConnection connection)
        {
            Response response = new Response();
            try
            {
                SqlCommand command = connection.CreateCommand();
                command.CommandText = @"
                        INSERT INTO Wallets (UserID, Type, InitialBalance, CreatedAt, UpdatedAt)
                        VALUES (@UserID, @Type, @InitialBalance, @CreatedAt, @UpdatedAt);
                        SELECT SCOPE_IDENTITY();";


                command.Parameters.AddWithValue("@UserID", wallets.UserID);
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
        public Response addTransection(Transections transections, SqlConnection connection)
        {
            Response response = new Response();
            try
            {
                SqlCommand command = connection.CreateCommand();
                command.CommandText = @"
                        INSERT INTO Transactions (UserID, WalletID, WalletType, CurrentBalance, TransactionType, CategoryType, TransactionDate, Description, Amount, CreatedAt)
                        VALUES (@UesrID, @WalletID, @WalletType, @CurrentBalance, @TransactionType, @CategoryType, @TransactionDate, @Description, @Amount, @CreatedAt);
                        SELECT SCOPE_IDENTITY();";


                command.Parameters.AddWithValue("@UesrID", transections.UserID);
                command.Parameters.AddWithValue("@WalletID", transections.WalletID);
                command.Parameters.AddWithValue("@WalletType", transections.WalletType);
                command.Parameters.AddWithValue("@CurrentBalance", transections.CurrentBalance);
                command.Parameters.AddWithValue("@TransactionType", transections.TransactionType);
                command.Parameters.AddWithValue("@CategoryType", transections.CategoryType);
                command.Parameters.AddWithValue("@TransactionDate", DateTime.Now);
                command.Parameters.AddWithValue("@Description", transections.Description);
                command.Parameters.AddWithValue("@Amount", transections.Amount);
                command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);

                connection.Open();
                int i = Convert.ToInt32(command.ExecuteScalar());
                transections.TransactionID = i;
                connection.Close();

                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Transection recorded successfully.";
                }
            }
            catch
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured while creating new transection. Try after sometime.";
            }
            return response;
        }
        
        //Edit Api's
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
        public Response editWallet(Wallets wallets, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"UPDATE Wallets SET Type = @WalletType, InitialBalance = @CurrentBalance, UpdatedAt = @UpdatedAt WHERE WalletID = @walletID;";
            command.Parameters.AddWithValue("@walletID", wallets.WalletID);
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
        public Response editTransection(Transections transections, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"UPDATE Transactions SET WalletID = @WalletID, WalletType = @WalletType, TransactionType = @TransactionType, CategoryType = @CategoryType, Description = @Description, Amount = @Amount, UpdatedAt = @UpdatedAt WHERE TransactionID = @TransactionID;";
            command.Parameters.AddWithValue("@TransactionID", transections.TransactionID);
            command.Parameters.AddWithValue("@WalletID", transections.WalletID);
            command.Parameters.AddWithValue("@WalletType", transections.WalletType);
            command.Parameters.AddWithValue("@TransactionType", transections.TransactionType);
            command.Parameters.AddWithValue("@CategoryType", transections.CategoryType);
            command.Parameters.AddWithValue("@Description", transections.Description);
            command.Parameters.AddWithValue("@Amount", transections.Amount);
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

        //Delete Api's
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
        
        //Show List Api's
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
        public Response showTransectionsList(int UserId, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = "Select * from Transactions Where UserID = @UserID";
            command.Parameters.AddWithValue("@UserID", UserId);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<Transections> transectionList = new List<Transections>();

            while (reader.Read())
            {
                Transections transectionData = new Transections
                {
                    TransactionID = Convert.ToInt32(reader["TransactionID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    WalletID = Convert.ToInt32(reader["WalletID"]),
                    WalletType = Convert.ToString(reader["WalletType"]),
                    CurrentBalance = Convert.ToInt32(reader["CurrentBalance"]),
                    TransactionType = Convert.ToString(reader["TransactionType"]),
                    CategoryType = Convert.ToString(reader["CategoryType"]),
                    TransactionDate = Convert.ToDateTime(reader["TransactionDate"]),
                    Description = Convert.ToString(reader["Description"]),
                    Amount = Convert.ToDecimal(reader["Amount"]),
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
                response.listTransections = null;
            }
            return response;
        }
        
        //Show By Id Api's
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
        public Response showTransectionById(int transectionId, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"Select * from Transactions where TransactionID = @TransactionID;";
            command.Parameters.AddWithValue("@TransactionID", transectionId);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            {
                if (reader.Read())
                {
                    Transections transectionData = new Transections
                    {
                        TransactionID = Convert.ToInt32(reader["TransactionID"]),
                        UserID = Convert.ToInt32(reader["UserID"]),
                        WalletID = Convert.ToInt32(reader["WalletID"]),
                        WalletType = Convert.ToString(reader["WalletType"]),
                        CurrentBalance = Convert.ToInt32(reader["CurrentBalance"]),
                        TransactionType = Convert.ToString(reader["TransactionType"]),
                        CategoryType = Convert.ToString(reader["CategoryType"]),
                        TransactionDate = Convert.ToDateTime(reader["TransactionDate"]),
                        Description = Convert.ToString(reader["Description"]),
                        Amount = Convert.ToDecimal(reader["Amount"]),
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
            }
            connection.Close();
            return response;
        }

        public Response showincomeById(int providedUserID, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"select * from Transactions where TransactionType = 'Credit' and UserID = @UserID;";
            command.Parameters.AddWithValue("@UserID", providedUserID);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<Transections> incomeList = new List<Transections>();

            while (reader.Read())
            {
                Transections transection = new Transections
                {
                    TransactionID = Convert.ToInt32(reader["TransactionID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    WalletID = Convert.ToInt32(reader["WalletID"]),
                    WalletType = Convert.ToString(reader["WalletType"]),
                    CurrentBalance = Convert.ToInt32(reader["CurrentBalance"]),
                    TransactionType = Convert.ToString(reader["TransactionType"]),
                    CategoryType = Convert.ToString(reader["CategoryType"]),
                    TransactionDate = Convert.ToDateTime(reader["TransactionDate"]),
                    Description = Convert.ToString(reader["Description"]),
                    Amount = Convert.ToDecimal(reader["Amount"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"])
                };

                incomeList.Add(transection);
            }
            connection.Close();

            if (incomeList.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Credit Transections Retrieved Successfully";
                response.incomeList = incomeList;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Credit Transections Found";
                response.incomeList = null;
            }

            return response;
        }

        public Response showexpanseById(int providedUserID, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"select * from Transactions where TransactionType = 'Debit' and UserID = @UserID;";
            command.Parameters.AddWithValue("@UserID", providedUserID);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<Transections> expanseList = new List<Transections>();

            while (reader.Read())
            {
                Transections transection = new Transections
                {
                    TransactionID = Convert.ToInt32(reader["TransactionID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    WalletID = Convert.ToInt32(reader["WalletID"]),
                    WalletType = Convert.ToString(reader["WalletType"]),
                    CurrentBalance = Convert.ToInt32(reader["CurrentBalance"]),
                    TransactionType = Convert.ToString(reader["TransactionType"]),
                    CategoryType = Convert.ToString(reader["CategoryType"]),
                    TransactionDate = Convert.ToDateTime(reader["TransactionDate"]),
                    Description = Convert.ToString(reader["Description"]),
                    Amount = Convert.ToDecimal(reader["Amount"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"])
                };

                expanseList.Add(transection);
            }
            connection.Close();

            if (expanseList.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Debit Transections Retrieved Successfully";
                response.expanseList = expanseList;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Debit Transections Found";
                response.expanseList = null;
            }

            return response;
        }

        public Response showcategoryById(int providedUserID, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"select count(TransactionID) As Value , categoryType from Transactions where transactiontype = 'debit' and UserID = @UserID Group By CategoryType ;";
            command.Parameters.AddWithValue("@UserID", providedUserID);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<Category> categoryList = new List<Category>();

            while (reader.Read())
            {
                Category category = new Category
                {
                    Value = Convert.ToInt32(reader["Value"]),
                    CategoryType = Convert.ToString(reader["CategoryType"]),
                    TotalBudget = 10,
                };

                categoryList.Add(category);
            }
            connection.Close();

            if (categoryList.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Debit Transections Retrieved Successfully";
                response.categoryList = categoryList;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Debit Transections Found";
                response.categoryList = null;
            }

            return response;
        }

        public Response shownotificationsByID(int providedUserID, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand command = connection.CreateCommand();
            command.CommandText = @"select * from Notifications where UserID = @UserID";
            command.Parameters.AddWithValue("@UserID", providedUserID);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<Notifications> notificationList = new List<Notifications>();

            while (reader.Read())
            {
                Notifications notifications = new Notifications
                {
                    NotificationID = Convert.ToInt32(reader["NotificationID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    Message = Convert.ToString(reader["Message"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    IsRead = Convert.ToBoolean(reader["IsRead"]),
                };

                notificationList.Add(notifications);
            }
            connection.Close();

            if (notificationList.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Notifications Retrieved Successfully";
                response.notificationsList = notificationList;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Notifications Found";
                response.notificationsList = null;
            }

            return response;
        }
    }
}

//public Response viewUser(int id, SqlConnection connection) 
//{
//    Response response = new Response();
//    SqlCommand command = connection.CreateCommand();
//    command.CommandText = "select * from Users where UserID = @UserId";
//    command.Parameters.AddWithValue("@UserId",id);
//    connection.Open();
//    using(SqlDataReader reader =  command.ExecuteReader()) 
//    {
//        Users User = new Users();
//        if (reader.Read())
//        {
//            User.UserId = Convert.ToInt32(reader["UserID"]);
//            User.FirstName = Convert.ToString(reader["FirstName"]);
//            User.LastName = Convert.ToString(reader["LastName"]);
//            User.Password = Convert.ToString(reader["Password"]);
//            User.Email = Convert.ToString(reader["Email"]);
//            User.CreatedAt = Convert.ToDateTime(reader["CreatedAt"]);
//            User.UpdatedAt = Convert.ToDateTime(reader["UpdatedAt"]);
//            response.StatusCode = 200;
//            response.StatusMessage = "User exists";
//            response.user = User;
//        }
//        else
//        {
//            response.StatusCode = 100;
//            response.StatusMessage = "User does not exists";
//            response.user = null;
//        }
//    }
//    connection.Close();
//    return response;
//}

//public Response viewWallet(Wallets wallets, SqlConnection connection)
//{
//    Response response = new Response();
//    SqlCommand command = connection.CreateCommand();
//    command.CommandText = "select * from Wallets where UserID = @UserId";
//    command.Parameters.AddWithValue("@UserId", wallets.UserID);

//    SqlDataAdapter adapter = new SqlDataAdapter(command);
//    DataTable dataTable = new DataTable();
//    adapter.Fill(dataTable);

//    Wallets Wallet = new Wallets();
//    if (dataTable.Rows.Count > 0)
//    {
//        Wallet.WalletID = Convert.ToInt32(dataTable.Rows[0]["WalletID"]);
//        Wallet.UserID = Convert.ToInt32(dataTable.Rows[0]["UserID"]);
//        Wallet.Type = Convert.ToString(dataTable.Rows[0]["Type"]);
//        Wallet.InitialBalance = Convert.ToDecimal(dataTable.Rows[0]["InitialBalance"]);
//        Wallet.CreatedAt = Convert.ToDateTime(dataTable.Rows[0]["CreatedAt"]);
//        Wallet.UpdatedAt = Convert.ToDateTime(dataTable.Rows[0]["UpdatedAt"]);
//        response.StatusCode = 200;
//        response.StatusMessage = "Wallet Details Fetched";
//        response.wallet = Wallet;
//    }
//    else
//    {
//        response.StatusCode = 100;
//        response.StatusMessage = "User does not exists";
//        response.wallet = null;
//    }
//    return response;
//}

//public Response viewTransection(Transections Transections, SqlConnection connection)
//{
//    Response response = new Response();
//    SqlCommand command = connection.CreateCommand();
//    command.CommandText = "select * from Transections where WalletID = @WalletID";
//    command.Parameters.AddWithValue("@WalletID", Transections.WalletID);

//    SqlDataAdapter adapter = new SqlDataAdapter(command);
//    DataTable dataTable = new DataTable();
//    adapter.Fill(dataTable);

//    Transections Transection = new Transections();
//    if (dataTable.Rows.Count > 0)
//    {
//        Transection.TransectionID = Convert.ToInt32(dataTable.Rows[0]["TransectionID"]);
//        Transection.WalletID = Convert.ToInt32(dataTable.Rows[0]["WalletID"]);
//        Transection.Amount = Convert.ToDecimal(dataTable.Rows[0]["Amount"]);
//        Transection.Date = Convert.ToDateTime(dataTable.Rows[0]["Date"]);
//        Transection.Category = Convert.ToString(dataTable.Rows[0]["Category"]);
//        Transection.Notes = Convert.ToString(dataTable.Rows[0]["Notes"]);
//        Transection.CreatedAt = Convert.ToDateTime(dataTable.Rows[0]["CreatedAt"]);
//        Transection.UpdatedAt = Convert.ToDateTime(dataTable.Rows[0]["UpdatedAt"]);
//        response.StatusCode = 200;
//        response.StatusMessage = "Transection Details Fetched";
//        response.transections = Transection;
//    }
//    else
//    {
//        response.StatusCode = 100;
//        response.StatusMessage = "Some error occured while fetching transections record. Try after sometime.";
//        response.transections = null;
//    }
//    return response;
//}
