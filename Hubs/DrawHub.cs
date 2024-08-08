using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollabDraw.Hubs
{
    public class DrawHub : Hub
    {
        private static readonly List<Stroke> strokes = new List<Stroke>();

        public async Task NewStrokes(IEnumerable<Stroke> newStrokes)
        {
            lock (strokes)
            {
                strokes.AddRange(newStrokes);
            }

            // Yeni strokeları diğer istemcilere yayınla
            await Clients.Others.SendAsync("ReceiveStrokes", newStrokes);
 
        }

        public async Task ClearCanvas()
        {
            lock (strokes)
            {
                strokes.Clear();
            }

            // Diğer istemcilere temizleme mesajı gönder
            await Clients.Others.SendAsync("ClearCanvas");
        }

        public override async Task OnConnectedAsync()
        {
            // Bağlı olan istemciye önceden çizilmiş strokeları gönder
            await Clients.Caller.SendAsync("ReceiveStrokes", strokes);

            // Canvası temizleme komutu gönder
            await Clients.Caller.SendAsync("ClearCanvas");

            await base.OnConnectedAsync();
        }
    }
}
