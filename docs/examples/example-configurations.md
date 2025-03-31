# Example Configurations

This guide provides real-world examples of security configurations that you can create using the platform. Each example includes:

- What it does
- When to use it
- How to set it up
- Best practices

## 1. Windows Server Security Configuration

### Purpose

Secure a Windows Server for hosting web applications.

### When to Use

- Setting up a new Windows Server
- Upgrading existing server security
- Meeting compliance requirements

### Configuration Steps

1. **Basic Security Settings**

   ```json
   {
     "system": "windows",
     "version": "2019",
     "settings": {
       "passwordPolicy": {
         "minLength": 14,
         "complexity": "high",
         "maxAge": 90,
         "history": 5
       },
       "firewall": {
         "enabled": true,
         "inboundRules": ["web", "rdp"],
         "outboundRules": ["all"]
       },
       "updates": {
         "automatic": true,
         "schedule": "daily",
         "time": "03:00"
       }
     }
   }
   ```

2. **Advanced Security**
   ```json
   {
     "advanced": {
       "auditPolicy": {
         "accountLogon": "success,failure",
         "accountManagement": "success,failure",
         "logonEvents": "success,failure"
       },
       "services": {
         "disabled": ["telnet", "tftp"],
         "enabled": ["windows update", "firewall"]
       }
     }
   }
   ```

### Best Practices

- Enable automatic updates
- Use strong password policies
- Enable firewall
- Regular security audits

## 2. Linux Web Server Configuration

### Purpose

Secure a Linux server running web applications.

### When to Use

- Setting up a new Linux server
- Securing existing web servers
- Meeting PCI compliance

### Configuration Steps

1. **System Security**

   ```json
   {
     "system": "linux",
     "distribution": "ubuntu",
     "version": "22.04",
     "settings": {
       "ssh": {
         "port": 22,
         "rootLogin": false,
         "passwordAuth": false
       },
       "firewall": {
         "enabled": true,
         "allowedPorts": [80, 443, 22],
         "defaultPolicy": "deny"
       }
     }
   }
   ```

2. **Web Server Security**
   ```json
   {
     "webServer": {
       "type": "nginx",
       "ssl": {
         "enabled": true,
         "certificate": "letsencrypt",
         "minVersion": "TLSv1.2"
       },
       "headers": {
         "xss": true,
         "hsts": true,
         "frameOptions": "DENY"
       }
     }
   }
   ```

### Best Practices

- Disable root SSH login
- Use SSH keys instead of passwords
- Enable SSL/TLS
- Regular security updates

## 3. Network Device Configuration

### Purpose

Secure network devices (routers, switches).

### When to Use

- Setting up new network infrastructure
- Upgrading network security
- Meeting network compliance

### Configuration Steps

1. **Basic Network Security**

   ```json
   {
     "device": "cisco",
     "type": "router",
     "settings": {
       "access": {
         "console": {
           "password": "strong-password",
           "timeout": 10
         },
         "vty": {
           "maxSessions": 5,
           "timeout": 10
         }
       },
       "snmp": {
         "enabled": true,
         "version": "v3",
         "community": "private"
       }
     }
   }
   ```

2. **Advanced Network Security**
   ```json
   {
     "advanced": {
       "routing": {
         "protocol": "ospf",
         "authentication": true,
         "area": 0
       },
       "acl": {
         "inbound": ["permit tcp any any eq 22"],
         "outbound": ["permit ip any any"]
       }
     }
   }
   ```

### Best Practices

- Use strong passwords
- Enable SNMP v3
- Configure ACLs
- Regular backups

## 4. Application Security Configuration

### Purpose

Secure a web application.

### When to Use

- Deploying new applications
- Upgrading application security
- Meeting OWASP compliance

### Configuration Steps

1. **Application Security**

   ```json
   {
     "application": "web",
     "framework": "nextjs",
     "settings": {
       "authentication": {
         "method": "jwt",
         "expiry": "1h",
         "refresh": "7d"
       },
       "cors": {
         "enabled": true,
         "origins": ["https://yourdomain.com"],
         "methods": ["GET", "POST", "PUT"]
       }
     }
   }
   ```

2. **Security Headers**
   ```json
   {
     "headers": {
       "contentSecurityPolicy": "default-src 'self'",
       "xFrameOptions": "DENY",
       "xContentTypeOptions": "nosniff",
       "strictTransportSecurity": "max-age=31536000"
     }
   }
   ```

### Best Practices

- Use HTTPS
- Implement proper CORS
- Set security headers
- Regular security testing

## 5. Database Security Configuration

### Purpose

Secure database servers.

### When to Use

- Setting up new databases
- Securing existing databases
- Meeting data protection requirements

### Configuration Steps

1. **Database Security**

   ```json
   {
     "database": "postgresql",
     "version": "14",
     "settings": {
       "access": {
         "remote": false,
         "allowedIPs": ["10.0.0.0/8"],
         "ssl": true
       },
       "authentication": {
         "method": "scram-sha-256",
         "passwordExpiry": 90
       }
     }
   }
   ```

2. **Advanced Settings**
   ```json
   {
     "advanced": {
       "audit": {
         "enabled": true,
         "events": ["ddl", "dml", "login"],
         "retention": "30d"
       },
       "encryption": {
         "atRest": true,
         "inTransit": true
       }
     }
   }
   ```

### Best Practices

- Use strong authentication
- Enable encryption
- Regular backups
- Monitor access logs

## Tips for All Configurations

1. **Before Applying**

   - Backup current settings
   - Test in a staging environment
   - Review changes carefully

2. **After Applying**

   - Verify all services work
   - Monitor for issues
   - Document changes

3. **Regular Maintenance**

   - Review security logs
   - Update configurations
   - Test security measures

4. **Compliance**
   - Check against standards
   - Document compliance
   - Regular audits

Remember: Always test configurations in a safe environment before applying them to production systems!
