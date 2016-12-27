using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace WebApplication.Models
{
    public static class AssetManifest
    {
        public static Dictionary<string, Dictionary<string, string>> LoadJson
        {
            get
            {
                using (StreamReader file = File.OpenText("wwwroot/components/AppManifests.json"))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    Dictionary<string, string> manifests = (Dictionary<string, string>)serializer.Deserialize(file, typeof(Dictionary<string, string>));
                    Dictionary<string, Dictionary<string, string>> assets = new Dictionary<string, Dictionary<string, string>>();
                    foreach (var pair in manifests)
                    {
                        var theKey = pair.Key;
                        var theValue = pair.Value;
                        using (StreamReader file2 = File.OpenText(theValue))
                        {
                            JsonSerializer serializer2 = new JsonSerializer();
                            Dictionary<string, string> appAssets = (Dictionary<string, string>)serializer2.Deserialize(file2, typeof(Dictionary<string, string>));
                            assets.Add(theKey, appAssets);
                        }
                    }
                    return assets;

                    //return manifests;
                }
            }
        }
    }
}