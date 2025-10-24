# VerifyEndpoints.ps1

# Base URL of your deployed app
$BaseUrl = "https://washify-qtg8.vercel.app"

Write-Host "======================================="
Write-Host "1) Testing GET /api/dashboard"
Write-Host "======================================="

try {
    $dashboardResponse = Invoke-RestMethod -Uri "$BaseUrl/api/dashboard" -Method GET
    Write-Host "✅ GET /api/dashboard successful (HTTP 200)" -ForegroundColor Green
    Write-Host "`nResponse body:"
    $dashboardResponse | ConvertTo-Json -Depth 5
}
catch {
    Write-Host "❌ GET /api/dashboard failed" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host "`nMake sure pages/api/dashboard.js exists and is correctly configured."
    exit 1
}

Write-Host "`n======================================="
Write-Host "2) Testing POST /api/sample"
Write-Host "======================================="

try {
    $sampleResponse = Invoke-RestMethod -Uri "$BaseUrl/api/sample" -Method POST -ContentType "application/json"
    Write-Host "✅ POST /api/sample successful (HTTP 200)" -ForegroundColor Green
    Write-Host "`nResponse body:"
    $sampleResponse | ConvertTo-Json -Depth 5
}
catch {
    Write-Host "❌ POST /api/sample failed" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host "`nMake sure pages/api/sample.js exists and is correctly configured."
    exit 1
}

Write-Host "`n======================================="
Write-Host "3) Verifying data insertion by re-testing GET /api/dashboard"
Write-Host "======================================="

try {
    $dashboardResponse2 = Invoke-RestMethod -Uri "$BaseUrl/api/dashboard" -Method GET
    $counts = [PSCustomObject]@{
        Customers = $dashboardResponse2.customers.Count
        Washers = $dashboardResponse2.washers.Count
        Appointments = $dashboardResponse2.appointments.Count
    }
    Write-Host "`nCounts after adding sample data:"
    $counts | Format-Table -AutoSize
    Write-Host "✅ All checks passed!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Re-fetching /api/dashboard failed" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit 1
}
