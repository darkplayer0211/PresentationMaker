// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

// +++ Định nghĩa command mà frontend sẽ gọi +++
#[tauri::command]
fn save_presentation(file_path: String, data: Vec<u8>) -> Result<(), String> {
  // Sử dụng Rust để ghi mảng byte (data) vào đường dẫn (file_path)
  match fs::write(&file_path, &data) {
    Ok(_) => Ok(()), // Nếu thành công, trả về Ok
    Err(e) => Err(format!("Failed to write file: {}", e.to_string())), // Nếu lỗi, trả về thông báo lỗi
  }
}

fn main() {
  tauri::Builder::default()
    // +++ Đăng ký plugin dialog +++
    .plugin(tauri_plugin_dialog::init())
    // +++ Đăng ký command của bạn ở đây +++
    .invoke_handler(tauri::generate_handler![
      save_presentation
      // ... (bất kỳ command nào khác bạn có)
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}