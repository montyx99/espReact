export const AP_LIST_POPULATION_ERROR = 'Access Point list cannot be populated!'
export const AP_LIST_RETRY_ERROR = 'Polling will retry in '
export const POLL_TIMEOUT = 300
// From ESP32 documentation:
// https://github.com/espressif/arduino-esp32/blob/master/tools/sdk/include/esp32/esp_wifi_types.h
export const WIFI_AUTH_OPEN = 0
export const WIFI_AUTH_WEP = 1
export const WIFI_AUTH_WPA_PSK = 2
export const WIFI_AUTH_WPA2_PSK = 3
export const WIFI_AUTH_WPA_WPA2_PSK = 4
export const WIFI_AUTH_WPA2_ENTERPRISE = 5
// Translate to readable strings
export const getEncryptionType = encryptionType => {
    switch (encryptionType) {
        case (WIFI_AUTH_OPEN):
           return "Open"
        case (WIFI_AUTH_WEP):
            return "WEP"
        case (WIFI_AUTH_WPA_PSK):
            return "WPA_PSK"
        case (WIFI_AUTH_WPA2_PSK):
            return "WPA2_PSK"
        case (WIFI_AUTH_WPA_WPA2_PSK):
            return "WPA_WPA2_PSK"
        case (WIFI_AUTH_WPA2_ENTERPRISE):
            return "WPA2_ENTERPRISE"
        default:
            return "Undefined"
    }
}