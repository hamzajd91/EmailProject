# restart codedeploy-agent to prevent memory leaks
sudo at -M now + 2 minute <<< $'sudo service codedeploy-agent restart'