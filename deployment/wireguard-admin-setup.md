# WireGuard Admin VPN Setup

Secure your backend administration by restricting access to a private WireGuard network.

## 1. Server Setup (In k3s)

Deploy the WireGuard pod in your `rootpulse` namespace.

```bash
helm install wireguard-ui hf-helm/wireguard-ui --namespace rootpulse
```

## 2. Access Policy

- **Admin Endpoints**: Configure Kong to only allow traffic to `/admin` or `/dashboard` from the WireGuard IP range (e.g., `10.8.0.0/24`).
- **Nginx White-list**:

```nginx
location /admin {
    allow 10.8.0.0/24;
    deny all;
    proxy_pass http://iam-service:8000;
}
```

## 3. Adding Clients

1. Generate peer configurations (QR Code/Conf file).
2. Distribute only to authorized developers.
3. Use the WireGuard client on your laptop/phone to connect to the backend securely.
