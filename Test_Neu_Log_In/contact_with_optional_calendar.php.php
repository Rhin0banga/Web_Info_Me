<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pflichtfelder abrufen und validieren
    $name = htmlspecialchars($_POST['name']); // Name des Absenders
    $email = htmlspecialchars($_POST['email']); // E-Mail-Adresse des Absenders
    $message = htmlspecialchars($_POST['message']); // Nachricht

    // Optional: Termin-Felder abrufen und prüfen
    $date = isset($_POST['date']) && !empty($_POST['date']) ? htmlspecialchars($_POST['date']) : "Nicht angegeben";
    $time = isset($_POST['time']) && !empty($_POST['time']) ? htmlspecialchars($_POST['time']) : "Nicht angegeben";
    $reason = isset($_POST['reason']) && !empty($_POST['reason']) ? htmlspecialchars($_POST['reason']) : "Nicht angegeben";

    // Ziel-E-Mail-Adresse und Betreff
    $to = "deine-email@example.com"; // Ersetze mit deiner eigenen E-Mail-Adresse
    $subject = "Neue Kontaktanfrage von $name";

    // Nachricht formatieren
    $email_body = "Neue Kontaktanfrage von:\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "E-Mail: $email\n\n";
    $email_body .= "Nachricht:\n$message\n\n";

    // Termin-Informationen hinzufügen, wenn ausgefüllt
    if ($date !== "Nicht angegeben" || $time !== "Nicht angegeben" || $reason !== "Nicht angegeben") {
        $email_body .= "Termin-Details:\n";
        $email_body .= "Datum: $date\n";
        $email_body .= "Uhrzeit: $time\n";
        $email_body .= "Grund: $reason\n\n";
    }

    // E-Mail-Header
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // E-Mail senden und Erfolg/Nicht-Erfolg anzeigen
    if (mail($to, $subject, $email_body, $headers)) {
        echo "Vielen Dank, $name! Deine Nachricht wurde erfolgreich gesendet. Wir melden uns so bald wie möglich bei dir.";
    } else {
        echo "Es gab ein Problem beim Senden der Nachricht. Bitte versuche es später erneut.";
    }
} else {
    echo "Ungültige Anfrage. Bitte nutze das Formular, um eine Nachricht zu senden.";
}
?>
