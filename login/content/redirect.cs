[System.Web.Services.WebMethod]
public static string login(string username, string password) {
  var cred = LoadCredential();
  var count = (from t in cred
  where t.username == username && t.password == password
  select t).Count();
  if (count == 1) {
    HttpContext.Current.Session["User"] = username;
    return "Success";
  }
  else {
    return "Failed";
  }
}

class Credential {
  public string username { get; set; }
  public string password { get; set; }
}

static List<Credential> LoadCredential() {
  List<Credential> credList = new List<Credential>();
  Credential cred = new Credential();
  cred.username = "Lisa";
  cred.password = "admin";
  credList.Add(cred);
  cred = new Credential();
  cred.username = "temp";
  cred.password = "admin";
  credList.Add(cred);
  cred = new Credential();
  cred.username = "temp2";
  cred.password = "admin";
  credList.Add(cred);
  return credList;
}
