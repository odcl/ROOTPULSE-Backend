# pfSense & Nginx Proxy Setup Guide

This guide describes how to configure your public-facing infrastructure for ROOTPULSE.

## 1. pfSense Firewall

- **Port Forwarding**: Forward ports `80` (HTTP) and `443` (HTTPS) to your Nginx Reverse Proxy IP.
- **Fail2Ban Integration**: pfSense can monitor Nginx logs via Syslog. Install the `snort` or `suricata` package for deeper packet inspection (IDS/IPS).

## 2. Nginx Reverse Proxy (WAF + SSL)

We recommend running Nginx as an Ingress Controller in k3s or a standalone VM.

### SSL with Let's Encrypt

Use **Cert-Manager** in k3s for automated issuance.

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@rootpulse.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

### Protection: Fail2Ban & ModSecurity

- **Fail2Ban**: Monitor Nginx access logs for `4xx/5xx` spikes.
- **ModSecurity**: Enable the OWASP Core Rule Set (CRS) in your Nginx config:

```nginx
# nginx.conf
load_module modules/ngx_http_modsecurity_module.so;
modsecurity on;
modsecurity_rules_file /etc/nginx/modsec/main.conf;
```

## 3. Storage Access

- Point your public storage domain (e.g., `s3.rootpulse.com`) to the MinIO LoadBalancer service in k3s.
