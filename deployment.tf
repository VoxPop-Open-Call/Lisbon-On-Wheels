terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
  backend "kubernetes" {
    secret_suffix = "state"
    config_path   = "~/.kube/config"
    namespace     = "terraform-react-on-wheels-lisbon"
  }
}
provider "kubernetes" {
  config_path = "~/.kube/config"
}
variable "backend-tag" {
  type        = string
  nullable    = false
  description = "tag of the backend image to be applied."
}
locals {
  project-name   = "on-wheels-lisbon"
  project-backend-name = "on_wheels_lisbon"
  namespace = "react"
  environment = {
    dev        = "dev"
    staging    = "staging"
    production = "prod"
  }
  host = {
    dev        = "${local.environment.dev}.${local.project-name}.devops.icapps-projects.com"
    staging    = "${local.environment.staging}.${local.project-name}.devops.icapps-projects.com"
    production = "${local.environment.production}.${local.project-name}.int.icapps-projects.com"
  }
  backend-image-repository = {
    dev        = "${local.namespace}_${local.project-backend-name}_dev"
    staging    = "${local.namespace}_${local.project-backend-name}_staging"
    production = "${local.namespace}_${local.project-backend-name}"
  }

  container-registry = {
    dev        = "828791980250.dkr.ecr.eu-central-1.amazonaws.com"
    staging    = "828791980250.dkr.ecr.eu-central-1.amazonaws.com"
    production = "828791980250.dkr.ecr.eu-central-1.amazonaws.com"
  }
  backend      = "nginx"
  backend_port = 80
}
resource "kubernetes_namespace" "app" {
  metadata {
    name = "${local.environment[terraform.workspace]}-${local.project-name}-${local.namespace}"
  }
}
resource "kubernetes_service" "backend" {
  metadata {
    name      = "${local.environment[terraform.workspace]}-${local.backend}-${local.project-name}-svc"
    namespace = kubernetes_namespace.app.metadata.0.name
    labels = {
      app         = "${local.environment[terraform.workspace]}-${local.backend}-${local.project-name}"
      environment = local.environment[terraform.workspace]
    }
  }
  spec {
    selector = {
      app         = "${local.environment[terraform.workspace]}-${local.backend}-${local.project-name}"
      environment = local.environment[terraform.workspace]
    }
    port {
      port     = local.backend_port
      protocol = "TCP"
      name     = "http"
    }
  }
}
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "${local.environment[terraform.workspace]}-${local.backend}-${local.project-name}-deployment"
    namespace = kubernetes_namespace.app.metadata.0.name
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = kubernetes_service.backend.spec.0.selector.app
      }
    }
    strategy {
      rolling_update {
        max_surge       = 1
        max_unavailable = 1
      }
    }
    min_ready_seconds = 5
    template {
      metadata {
        labels = {
          app         = kubernetes_service.backend.spec.0.selector.app
          environment = local.environment[terraform.workspace]
        }
      }
      spec {
        container {
          name  = "${local.environment[terraform.workspace]}-${local.backend}-${local.project-name}-backend"
          image = "${local.container-registry[terraform.workspace]}/${local.backend-image-repository[terraform.workspace]}:${var.backend-tag}"
          port {
            container_port = local.backend_port
          }
          resources {
            limits = {
              cpu    = "200m"
              memory = "300Mi"
            }
            requests = {
              cpu    = "10m"
              memory = "10Mi"
            }
          }
        }
      }
    }
  }
}
resource "kubernetes_ingress_v1" "ingress" {
  metadata {
    name      = "${local.environment[terraform.workspace]}-${local.backend}-${local.project-name}-ingress"
    namespace = kubernetes_namespace.app.metadata.0.name
    annotations = {
      "kubernetes.io/ingress.class"               = "nginx"
      "cert-manager.io/cluster-issuer"            = "letsencrypt-production"
      "acme.cert-manager.io/http01-edit-in-place" = "true"
    }
  }
  spec {
    tls {
      hosts       = [local.host[terraform.workspace]]
      secret_name = "${local.environment[terraform.workspace]}-${local.backend}-${local.project-name}-tls"
    }
    rule {
      host = local.host[terraform.workspace]
      http {
        path {
          path = "/"
          backend {
            service {
              name = kubernetes_service.backend.metadata[0].name
              port {
                number = local.backend_port
              }
            }
          }
        }
      }
    }
  }
}