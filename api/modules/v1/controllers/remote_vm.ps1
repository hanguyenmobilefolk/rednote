Write-Host "Begin PS"
Select-AzureRmProfile -Path c:\azureprofile.json
Write-Host "Get login information success"
Start-AzureRmVM -ResourceGroupName rednotev2 -Name rednotev2 
Write-Host "Start VM success"