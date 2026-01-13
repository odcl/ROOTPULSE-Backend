# Keycloak Scaling Strategy for "Crore" Sessions

To scale Keycloak from thousands to millions (1Cr+) of active sessions, we use a decentralized, tiered architecture.

## 1. Multi-Realm Sharding

- **Strategy**: Instead of one massive realm, shard users into multiple logical realms (e.g., `rootpulse-asia`, `rootpulse-us`).
- **Logic**: Each realm has its own database schema or Citus partition, reducing the blast radius of lookups.

## 2. External Infispan / Redis Caching

- **Implementation**: Offload session data from the Keycloak instances to an external **Redis Cluster**.
- **Benefit**: Allows Keycloak pods to be fully stateless, enabling faster HPA scale-up/down.

## 3. Storage Federation

- **User Federation**: Use LDAP or external SQL shards (geo-distributed) to store user identities.
- **Lazy Loading**: Only load user details into Keycloak on-demand during the auth flow.

## 4. Multi-Region Replication

- **Geo-Scaling**: Use **Karmada** to deploy Keycloak clusters across multiple regions.
- **Sync**: Use cross-site replication for session tokens to allow "Single Sign-On" even if a user switches regions.

## 5. Security Hardening

- **Fail2Ban**: Monitor Keycloak `login-failure` events via Syslog and block IPs at the pfSense/Nginx level.
- **Rate Limiting**: Use Kong's `rate-limiting` plugin to prevent brute-force attacks on the `/auth` endpoint.
