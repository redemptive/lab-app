#
# Cookbook:: node
# Recipe:: default
#
# Copyright:: 2018, The Authors, All Rights Reserved.

apt_update

package 'nginx'

service 'nginx' do
	action [:enable, :start]
end

template '/etc/nginx/sites-available/default' do
	source 'proxy.conf.erb'
	owner  'root'
	group  'root'
	mode   '0750'
	notifies :reload, 'service[nginx]'
end

execute 'install node' do
	command  'curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -'
end

# execute 'update node resources' do
# 	command 'sh /tmp/nodesource_setup.sh'
# end

execute 'clean repos' do
	command 'sudo rm -rf /var/lib/apt/lists/*'
	command 'apt-get clean'
end

apt_update

package 'nodejs' do
	action :upgrade
end

# package 'npm'