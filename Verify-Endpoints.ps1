# VerifyEndpoints.ps1

# Base URL of your deployed app
$BaseUrl = "https://washify-qtg8.vercel.app"

Write-Host "1) Testing GET /api/dashboard"

try {
    $dashboardResponse = Invoke-RestMethod -Uri "$BaseUrl/api/dashboard" -Method GET
    Write-Host "✅ GET /api/dashboard successful"
    Write-Host "Response body:"
    $dashboardResponse | ConvertTo-Json -Depth 5
}
catch {
    Write-Host "❌ GET /api/dashboard failed"
    Write-Host $_.Exception.Message
    exit 1
}

Write-Host "`n2) Testing POST /api/sample"

try {
    $sampleResponse = Invoke-RestMethod -Uri "$BaseUrl/api/sample" -Method POST -ContentType "application/json"
    Write-Host "✅ POST /api/sample successful"
    Write-Host "Response body:"
    $sampleResponse | ConvertTo-Json -Depth 5
}
catch {
    Write-Host "❌ POST /api/sample failed"
    Write-Host $_.Exception.Message
    exit 1
}

Write-Host "`n3) Verifying data insertion by re-testing GET /api/dashboard"

try {
    $dashboardResponse2 = Invoke-RestMethod -Uri "$BaseUrl/api/dashboard" -Method GET
    $counts = [PSCustomObject]@{
        Customers = $dashboardResponse2.customers.Count
        Washers = $dashboardResponse2.washers.Count
        Appointments = $dashboardResponse2.appointments.Count
    }
    Write-Host "Counts after adding sample data:"
    $counts | Format-Table
}
catch {
    Write-Host "❌ Re-fetching /api/dashboard failed"
    Write-Host $_.Exception.Message
    exit 1
}
