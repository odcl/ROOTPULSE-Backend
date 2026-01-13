# k3s Multi-Node Setup Guide

This guide describes how to scale your ROOTPULSE orchestration from a single node to a production-ready multi-node cluster.

## 1. Architecture

- **Control Plane**: 1 Node (handles API server, scheduler, etc.)
- **Worker Nodes**: 2 Nodes (handles container workloads)
- **Efficiency**: k3s uses **50% less RAM** than full Kubernetes by bundling components and using SQLite/external DB.

## 2. Installation Steps

### Step A: Control Plane Setup

Run this on your master server:

```bash
curl -sfL https://get.k3s.io | sh -s - server \
  --cluster-init \
  --disable traefik \
  --write-kubeconfig-mode 644
```

Get the node token:

```bash
cat /var/lib/rancher/k3s/server/node-token
```

### Step B: Worker Node Setup

Run this on both worker nodes (W1, W2):

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://<CONTROL_PLANE_IP>:6443 K3S_TOKEN=<NODE_TOKEN> sh -
```

### Step C: Labeling Nodes

Label your worker nodes for specific workloads (e.g., GPU for AI):

```bash
kubectl label node <WORKER_NODE_NAME> accelerator=nvidia-gpu
```

## 3. High Availability (HA)

For crore-level production, consider a 3-node Control Plane with an external PostgreSQL (Citus) as the Kine datastore.
