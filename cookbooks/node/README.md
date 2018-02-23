## Title

# chef-node-cookbook

## Description

A chef cookbook for installing nodejs on an ubuntu server. This cookbook also installs the nginx web server and configures it to be used as a reverse proxy to allow requests to port 80 to be passed onto nodejs running on port 3000

## Technologies

- Chef
- Vagrant
- VirtualBox

## Installation and Usage

- Installation of dependancies
  - Install VirtualBox from https://www.virtualbox.org/wiki/Downloads
  - Install Vagrant from https://www.vagrantup.com/downloads.html
  - Install ChefDK from https://downloads.chef.io/chefdk

- Testing the cookbook
  - Download the repository, navigate to it in the command line and run kitchen test