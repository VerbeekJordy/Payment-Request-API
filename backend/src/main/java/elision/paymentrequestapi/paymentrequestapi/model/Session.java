package elision.paymentrequestapi.paymentrequestapi.model;

public class Session {
    private static String username = "GUEST";

    public static String getUsername() {
        return username;
    }

    public static void setUsername(String username) {
        Session.username = username;
    }
}
