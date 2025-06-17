from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Ensure the bookings directory exists
if not os.path.exists('bookings'):
    os.makedirs('bookings')

# Initialize CSV file with headers if it doesn't exist
bookings_file = 'bookings/bookings.csv'
if not os.path.exists(bookings_file):
    with open(bookings_file, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            'Booking ID',
            'Timestamp',
            'Destination',
            'Full Name',
            'Email',
            'Phone',
            'Number of Travelers',
            'Travel Date',
            'Duration',
            'Base Price',
            'Total Price',
            'Special Preferences'
        ])

@app.route('/submit_booking', methods=['POST'])
def submit_booking():
    try:
        # Get form data
        data = request.form
        
        # Calculate total price
        base_price = float(data.get('base_price', 0))
        travelers = int(data.get('travelers', 1))
        total_price = base_price * travelers
        
        # Generate booking ID (timestamp-based)
        booking_id = f"BK{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        # Prepare row data
        row = [
            booking_id,
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            data.get('destination', ''),
            data.get('full_name', ''),
            data.get('email', ''),
            data.get('phone', ''),
            travelers,
            data.get('travel_date', ''),
            data.get('duration', ''),
            base_price,
            total_price,
            data.get('preferences', '')
        ]
        
        # Append to CSV file
        with open(bookings_file, 'a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(row)
        
        return jsonify({
            'success': True,
            'message': 'Booking confirmed successfully!',
            'booking_id': booking_id
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error processing booking: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 