namespace FoodEcomerce
{
    public class AppSettingsProvider
    {
        private static readonly IConfigurationRoot Configuration;
        static AppSettingsProvider()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            Configuration = builder.Build();
        }
        public static string Get(string name)
        {
            return Configuration.GetSection("AppSettings")[name];
        }
    }
}
