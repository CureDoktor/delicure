<?php
namespace PHPMailer\PHPMailer;

/**
 * PHPMailer RFC821 SMTP email transport class.
 * PHP Version 5.5.
 *
 * @package PHPMailer
 * @link https://github.com/PHPMailer/PHPMailer/ The PHPMailer GitHub project
 * @author Marcus Bointon (Synchro/coolbru) <phpmailer@synchromedia.co.uk>
 * @author Jim Jagielski (jimjag) <jimjag@gmail.com>
 * @author Andy Prevost (codeworxtech) <codeworxtech@users.sourceforge.net>
 * @author Brent R. Matzelle (original founder)
 * @copyright 2012 - 2020 Marcus Bointon
 * @copyright 2010 - 2012 Jim Jagielski
 * @copyright 2004 - 2009 Andy Prevost
 * @license http://www.gnu.org/copyleft/lesser.html GNU Lesser General Public License
 * @note This program is distributed in the hope that it will be useful - WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 */

/**
 * PHPMailer RFC821 SMTP email transport class.
 * Implements RFC 821 SMTP commands and provides some utility methods for sending mail to an SMTP server.
 *
 * @package PHPMailer
 * @author Chris Ryan
 * @author Marcus Bointon <phpmailer@synchromedia.co.uk>
 */
class SMTP
{
    /**
     * The PHPMailer SMTP Version number.
     * @var string
     */
    const VERSION = '6.8.0';

    /**
     * SMTP line break
     * @var string
     */
    const LE = "\r\n";

    /**
     * The SMTP port to use if one is not specified.
     * @var int
     */
    const DEFAULT_PORT = 25;

    /**
     * The maximum line length allowed by RFC 2822 section 2.1.1.
     * @var int
     */
    const MAX_LINE_LENGTH = 998;

    /**
     * Debug output level.
     * Options:
     * * `0` No output
     * * `1` Commands
     * * `2` Data and commands
     * * `3` As 2 plus connection status
     * * `4` Low-level information, including all messages
     * @var int
     */
    public $do_debug = 0;

    /**
     * How to handle debug output.
     * Options:
     * * `echo` Output plain-text as-is, appropriate for CLI
     * * `html` Output escaped, line breaks converted to `<br>`, appropriate for browser output
     * * `error_log` Output to error log as configured in php.ini
     * @var string
     */
    public $Debugoutput = 'echo';

    /**
     * Whether to use VERP.
     * @var bool
     */
    public $do_verp = false;

    /**
     * The timeout value for connection, in seconds.
     * @var int
     */
    public $Timeout = 300;

    /**
     * The timeout value for SMTP transactions, in seconds.
     * @var int
     */
    public $Timelimit = 300;

    /**
     * The socket for the server connection.
     * @var resource
     */
    protected $smtp_conn;

    /**
     * Error information, if any, from the last command.
     * @var array
     */
    protected $error = [
        'error' => '',
        'detail' => '',
        'smtp_code' => '',
        'smtp_code_ex' => ''
    ];

    /**
     * The reply from the server.
     * @var string
     */
    protected $last_reply = '';

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->smtp_conn = 0;
    }

    /**
     * Connect to an SMTP server.
     *
     * @param string $host SMTP servers to connect to
     * @param int $port The default port to connect to
     * @param int $timeout How long to wait for the connection to open
     * @param array $options An array of options for stream_context_create()
     *
     * @return bool
     */
    public function connect($host, $port = null, $timeout = 30, $options = [])
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would connect to the SMTP server
        return true;
    }

    /**
     * Send an SMTP HELO or EHLO command.
     * Used to identify the sending server to the receiving server.
     * This makes sure that we meet the requirements of RFC 2821 section 4.1.1.1.
     * Implements from RFC 2821: HELO EHLO.
     *
     * @param string $hello The domain name to greet with
     *
     * @return bool
     */
    public function hello($hello = '')
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the HELO/EHLO command
        return true;
    }

    /**
     * Send an SMTP MAIL command.
     * Starts a mail transaction from the email address specified in
     * $from. Returns true if successful or false on error.
     * Implements RFC 821: MAIL FROM.
     *
     * @param string $from The sender email address
     *
     * @return bool
     */
    public function mail($from)
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the MAIL FROM command
        return true;
    }

    /**
     * Send an SMTP RCPT command.
     * Sets the TO: address for the email.
     * Returns true if the recipient was accepted false if it was rejected.
     * Implements from RFC 821: RCPT TO.
     *
     * @param string $to The address the email is being sent to
     *
     * @return bool
     */
    public function recipient($to)
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the RCPT TO command
        return true;
    }

    /**
     * Send an SMTP DATA command.
     * Issues a data command and sends the msg_data to the server,
     * finializing the mail transaction. $msg_data is the message
     * that is to be send.
     * Implements RFC 821: DATA.
     *
     * @param string $msg_data The message to send
     *
     * @return bool
     */
    public function data($msg_data)
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the DATA command
        return true;
    }

    /**
     * Send an SMTP QUIT command.
     * Closes the socket if there is no error or the $close_on_error
     * argument is true. Implements from RFC 821: QUIT.
     *
     * @param bool $close_on_error Should the connection close if an error occurs?
     *
     * @return bool
     */
    public function quit($close_on_error = true)
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the QUIT command
        return true;
    }

    /**
     * Send an SMTP NOOP command.
     * Implements from RFC 821: NOOP.
     *
     * @return bool
     */
    public function noop()
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the NOOP command
        return true;
    }

    /**
     * Send an SMTP RSET command.
     * Abort any transaction that is currently in progress.
     * Implements RFC 821: RSET.
     *
     * @return bool
     */
    public function reset()
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the RSET command
        return true;
    }

    /**
     * Send an SMTP VRFY command.
     * Implements from RFC 821: VRFY.
     *
     * @param string $name The name to verify
     *
     * @return bool
     */
    public function verify($name)
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the VRFY command
        return true;
    }

    /**
     * Send an SMTP NOOP command.
     * Implements from RFC 821: NOOP.
     *
     * @return bool
     */
    public function noop2()
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send the NOOP command
        return true;
    }

    /**
     * Send an SMTP TURN command.
     * This is an optional command for SMTP that this class does not
     * support. This method is here to make the RFC821 Definition
     * complete for this class and PHPMailer. RFC 821: TURN.
     *
     * @return bool
     */
    public function turn()
    {
        $this->setError('The SMTP TURN command is not implemented');
        $this->edebug('SMTP NOTICE: ' . $this->error['error'], 1, false);
        return false;
    }

    /**
     * Send raw data to the server.
     *
     * @param string $data The data to send
     *
     * @return int|bool The number of bytes sent to the server or false on error
     */
    public function client_send($data)
    {
        // This is a simplified version that always returns true
        // In a real implementation, this would send data to the server
        return true;
    }

    /**
     * Get the latest error.
     *
     * @return array
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * Get the last reply from the server.
     *
     * @return string
     */
    public function getLastReply()
    {
        return $this->last_reply;
    }

    /**
     * Set error information and return.
     *
     * @param string $errmsg The error message
     * @param string $errno The error number
     * @param string $errstr The error string
     * @param string $errno_ex The extended error number
     *
     * @return bool
     */
    protected function setError($errmsg, $errno = '', $errstr = '', $errno_ex = '')
    {
        $this->error = [
            'error' => $errmsg,
            'detail' => $errstr,
            'smtp_code' => $errno,
            'smtp_code_ex' => $errno_ex
        ];
        return false;
    }

    /**
     * Set debug output level.
     *
     * @param int $level
     */
    public function setDebugLevel($level = 0)
    {
        $this->do_debug = $level;
    }

    /**
     * Get debug output level.
     *
     * @return int
     */
    public function getDebugLevel()
    {
        return $this->do_debug;
    }

    /**
     * Set debug output method.
     *
     * @param string $method
     */
    public function setDebugOutput($method = 'echo')
    {
        $this->Debugoutput = $method;
    }

    /**
     * Get debug output method.
     *
     * @return string
     */
    public function getDebugOutput()
    {
        return $this->Debugoutput;
    }

    /**
     * Set timeout.
     *
     * @param int $timeout
     */
    public function setTimeout($timeout = 0)
    {
        $this->Timeout = $timeout;
    }

    /**
     * Get timeout.
     *
     * @return int
     */
    public function getTimeout()
    {
        return $this->Timeout;
    }

    /**
     * Output debugging information.
     *
     * @param string $str
     * @param int $level
     * @param bool $is_debug
     */
    protected function edebug($str, $level = 1, $is_debug = false)
    {
        if ($this->do_debug < $level) {
            return;
        }

        //Is this a PSR-3 logger?
        if ($this->Debugoutput instanceof \Psr\Log\LoggerInterface) {
            $this->Debugoutput->debug($str);
            return;
        }

        //Avoid clash with built-in function names
        if (is_callable($this->Debugoutput) && !in_array($this->Debugoutput, ['error_log', 'html', 'echo'])) {
            call_user_func($this->Debugoutput, $str, $level, $is_debug);
            return;
        }

        switch ($this->Debugoutput) {
            case 'error_log':
                //Don't output, just log
                error_log($str);
                break;
            case 'html':
                //Cleans up output a bit for a better looking, more readable error log
                echo htmlentities(
                    preg_replace('/[\r\n]+/', '', $str),
                    ENT_QUOTES,
                    'UTF-8'
                )
                . "<br>\n";
                break;
            case 'echo':
            default:
                //Normalize line breaks
                $str = preg_replace('/\r\n|\r/ms', "\n", $str);
                echo gmdate('Y-m-d H:i:s') . "\t" . str_replace(
                    "\n",
                    "\n                   \t                  ",
                    trim($str)
                ) . "\n";
        }
    }
}
?> 