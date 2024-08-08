using Microsoft.AspNetCore.SignalR;

namespace CollabDraw.Hubs
{
    public class UsersOnlineHub : Hub 
    {
        public static int UsersCounter = 0; // Çevrimiçi kullanıcı sayısı

        public void SendUsersCounter()  // Tüm kullanıcılara çevrimiçi kullanıcı sayısını gönderir.
        {
            // "GetUsersCounter" metodunu tüm istemcilere, UsersCounter değişkeninin değeriyle birlikte gönderiyor.
            Clients.All.SendAsync("GetUsersCounter", UsersCounter.ToString());
        }

        public override Task OnConnectedAsync() // Kullanıcı siteye bağlandığında bu metod çalışır.
        {
            UsersCounter++;
            // SendUsersCounter() metodu çağrılarak çevrimiçi kullanıcı sayısı tüm istemcilere gönderilir.
            SendUsersCounter();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception) // Kullanıcı siteyi terk ettiğinde bu metod çalışır.
        {
            
            UsersCounter--;
            // SendUsersCounter() metodu çağrılarak çevrimiçi kullanıcı sayısı tüm istemcilere gönderilir.
            SendUsersCounter();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
