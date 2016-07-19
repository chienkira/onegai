Vagrant.configure("2") do |config|
  config.vm.box = "tanuck/ubucake"

  # Disable automatic box update checking?
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM.
  config.vm.synced_folder "./", "/var/www/html"

end
