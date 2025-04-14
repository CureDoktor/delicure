<?php
namespace PHPMailer\PHPMailer;

/**
 * PHPMailer - PHP email creation and transport class.
 */
class PHPMailer
{
    /**
     * The PHPMailer Version number.
     * @var string
     */
    const VERSION = '6.8.0';

    /**
     * The SMTP host.
     * @var string
     */
    public $Host = 'localhost';

    /**
     * The SMTP port.
     * @var int
     */
    public $Port = 25;

    /**
     * The SMTP username.
     * @var string
     */
    public $Username = '';

    /**
     * The SMTP password.
     * @var string
     */
    public $Password = '';

    /**
     * The SMTP authentication type.
     * @var string
     */
    public $AuthType = '';

    /**
     * The SMTP secure type.
     * @var string
     */
    public $SMTPSecure = '';

    /**
     * Whether to use SMTP authentication.
     * @var bool
     */
    public $SMTPAuth = false;

    /**
     * The sender email address.
     * @var string
     */
    public $From = '';

    /**
     * The sender name.
     * @var string
     */
    public $FromName = '';

    /**
     * The email subject.
     * @var string
     */
    public $Subject = '';

    /**
     * The email body.
     * @var string
     */
    public $Body = '';

    /**
     * Whether the email is HTML.
     * @var bool
     */
    public $isHTML = false;

    /**
     * The recipients.
     * @var array
     */
    protected $to = [];

    /**
     * The error info.
     * @var string
     */
    public $ErrorInfo = '';

    /**
     * Constructor.
     * @param bool $exceptions Whether to throw exceptions for errors.
     */
    public function __construct($exceptions = null)
    {
        $this->exceptions = ($exceptions == true);
    }

    /**
     * Set the SMTP host.
     * @param string $host The SMTP host.
     * @return $this
     */
    public function setHost($host)
    {
        $this->Host = $host;
        return $this;
    }

    /**
     * Set the SMTP port.
     * @param int $port The SMTP port.
     * @return $this
     */
    public function setPort($port)
    {
        $this->Port = $port;
        return $this;
    }

    /**
     * Set the SMTP username.
     * @param string $username The SMTP username.
     * @return $this
     */
    public function setUsername($username)
    {
        $this->Username = $username;
        return $this;
    }

    /**
     * Set the SMTP password.
     * @param string $password The SMTP password.
     * @return $this
     */
    public function setPassword($password)
    {
        $this->Password = $password;
        return $this;
    }

    /**
     * Set the SMTP secure type.
     * @param string $secure The SMTP secure type.
     * @return $this
     */
    public function setSMTPSecure($secure)
    {
        $this->SMTPSecure = $secure;
        return $this;
    }

    /**
     * Set whether to use SMTP authentication.
     * @param bool $auth Whether to use SMTP authentication.
     * @return $this
     */
    public function setSMTPAuth($auth)
    {
        $this->SMTPAuth = $auth;
        return $this;
    }

    /**
     * Set the sender email address.
     * @param string $email The sender email address.
     * @param string $name The sender name.
     * @return $this
     */
    public function setFrom($email, $name = '')
    {
        $this->From = $email;
        $this->FromName = $name;
        return $this;
    }

    /**
     * Add a recipient.
     * @param string $email The recipient email address.
     * @param string $name The recipient name.
     * @return $this
     */
    public function addAddress($email, $name = '')
    {
        $this->to[] = ['email' => $email, 'name' => $name];
        return $this;
    }

    /**
     * Set the email subject.
     * @param string $subject The email subject.
     * @return $this
     */
    public function setSubject($subject)
    {
        $this->Subject = $subject;
        return $this;
    }

    /**
     * Set the email body.
     * @param string $body The email body.
     * @return $this
     */
    public function setBody($body)
    {
        $this->Body = $body;
        return $this;
    }

    /**
     * Set whether the email is HTML.
     * @param bool $isHTML Whether the email is HTML.
     * @return $this
     */
    public function isHTML($isHTML = true)
    {
        $this->isHTML = $isHTML;
        return $this;
    }

    /**
     * Send the email.
     * @return bool Whether the email was sent successfully.
     */
    public function send()
    {
        // This is a simplified version that uses the PHP mail() function
        // In a real implementation, this would use SMTP
        
        $headers = [];
        
        if ($this->isHTML) {
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-Type: text/html; charset=UTF-8';
        }
        
        if ($this->From) {
            $headers[] = 'From: ' . ($this->FromName ? $this->FromName . ' <' . $this->From . '>' : $this->From);
        }
        
        $to = [];
        foreach ($this->to as $recipient) {
            $to[] = $recipient['name'] ? $recipient['name'] . ' <' . $recipient['email'] . '>' : $recipient['email'];
        }
        
        $result = mail(implode(', ', $to), $this->Subject, $this->Body, implode("\r\n", $headers));
        
        if (!$result) {
            $this->ErrorInfo = error_get_last()['message'] ?? 'Unknown error';
        }
        
        return $result;
    }
}
?> 