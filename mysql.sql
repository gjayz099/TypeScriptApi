

-- Admin Table
-- Switching to the created database
USE bookingairlineapi;


CREATE TABLE User (
    Id CHAR(36) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,  -- Admin username (unique)
    PasswordHash VARCHAR(255) NULL,        -- Encrypted password
    FullName VARCHAR(100) NULL,            -- Admin full name
    Email VARCHAR(100) NULL,               -- Admin email
    Role VARCHAR(50) NULL DEFAULT 'AdminUser', -- Role (e.g., AdminUser, SuperAdmin)
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL
);

-- Passenger Table
CREATE TABLE Passenger (
    Id CHAR(36) PRIMARY KEY,
    FirstName VARCHAR(50) NULL,
    LastName VARCHAR(50) NULL,
    MiddleName VARCHAR(50) NULL,
    DateOfBirth Date NULL,
    Gender VARCHAR(10) NULL,  -- Male or Female
    Nationality VARCHAR(50) NULL,
    PassportNumber VARCHAR(20) NULL,
    Email VARCHAR(100) NULL,
    PhoneNumber VARCHAR(20) NULL,
    EmergencyContact VARCHAR(20) NULL,
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL
);



-- Flight Table
CREATE TABLE Flight (
    Id CHAR(36) PRIMARY KEY,
    FlightNumber VARCHAR(10) UNIQUE NOT NULL, -- Flight number should be unique, not the primary key
    DepartureAirport VARCHAR(200) NULL,
    ArrivalAirport VARCHAR(200) NULL,
    FlightPrice DECIMAL(8,2) NULL, -- PH CURRENCY
    FlightDuration VARCHAR(50) NULL,  # --Time In Air
    DepartureDate DATE,
    DepartureTime TIME,
    Airline VARCHAR(50) NULL,
    PassengerCapacity INT NULL,
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL
);

-- Booking Table
CREATE TABLE Booking (
    Id CHAR(36) PRIMARY KEY,
    PassengerID CHAR(36) NULL,
    BookingDate DATE NULL,  -- Current date and time
    FlightID CHAR(36) NULL,
    DepartureDateTime DATETIME NULL, --- Optional
    ArrivalDateTime DATETIME NULL,  --- Optional
    SeatClass VARCHAR(20) NULL,
    SeatPreference VARCHAR(20) NULL,
    BookingStatus VARCHAR(20) NULL,  -- Status of booking (e.g., Confirmed, Pending, Cancelled)
    PaymentStatus VARCHAR(20) NULL,  -- Payment Status: 'Paid', 'Unpaid', 'Refund Pending'
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL,
    FOREIGN KEY (PassengerID) REFERENCES Passenger(Id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (FlightID) REFERENCES Flight(Id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
-- Baggage Table
CREATE TABLE Baggage (
    Id CHAR(36) PRIMARY KEY,
    BookingID CHAR(36) NULL,
    BaggageType VARCHAR(20) NULL,
    Weight DECIMAL(8,2) NULL,
    BaggageAllowance DECIMAL(8,2) NULL,
    ExcessWeight DECIMAL(8,2) NULL,
    BaggagePrice DECIMAL(8,2) NULL, # --- Price in Baggage 
    BaggageClaimLocation VARCHAR(250) NULL, -- Place To Claim
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL,
    FOREIGN KEY (BookingID) REFERENCES Booking(Id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Payment Table
CREATE TABLE Payment (
    Id CHAR(36) PRIMARY KEY,
    BookingID CHAR(36) NULL,
    Amount DECIMAL(8,2) NULL,
    PaymentMethod VARCHAR(20) NULL,  -- Payment method, e.g., 'Credit Card', 'Cash', etc.
    PaymentStatus VARCHAR(30) NULL,  -- Payment Status: 'Paid', 'Unpaid', 'Refund Pending'
    PaymentDate DATETIME NULL,
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL,
    FOREIGN KEY (BookingID) REFERENCES Booking(Id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Check-in Table
CREATE TABLE Checkin (
    Id CHAR(36) PRIMARY KEY,
    BookingID CHAR(36) NULL,
    CheckinDate DATE NULL,
    CheckinTime TIME NULL,
    CheckinStatus VARCHAR(20) NULL,  -- Check-in Status: 'Checked-in', 'Pending', 'Cancelled'
    BoardingGate VARCHAR(20) NULL,
    BoardingTime TIME NULL,
    SeatAssignment VARCHAR(10) NULL,  -- Seat assignment: ST01 to ST100
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL,
    FOREIGN KEY (BookingID) REFERENCES Booking(Id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Refund Table
CREATE TABLE Refund (
    Id CHAR(36) PRIMARY KEY,
    BookingID CHAR(36) NULL,
    RefundAmount DECIMAL(8,2) NULL,
    RefundStatus VARCHAR(30) NULL,  -- Refund Status: 'Processed', 'Pending', 'Denied'
    ReasonForRefund TEXT NULL,
    RefundRequestDate DATETIME NULL,
    RefundProcessedDate DATETIME NULL,
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL,
    FOREIGN KEY (BookingID) REFERENCES Booking(Id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Disruption Table
CREATE TABLE Disruption (
    Id CHAR(36) PRIMARY KEY,
    FlightID CHAR(36) NULL,
    DisruptionType VARCHAR(50) NULL,  -- Disruption Type: 'Delay', 'Cancellation', 'Diversion'
    DisruptionCause VARCHAR(100) NULL,  -- Cause of disruption (e.g., 'Weather', 'Technical Issue')
    NewFlightAssignment VARCHAR(50) NULL,
    Compensation VARCHAR(100) NULL,  -- Compensation for the passenger (e.g., 'Meal Voucher', 'Hotel Voucher')
    DisruptionDate DATETIME NULL,
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL,
    FOREIGN KEY (FlightID) REFERENCES Flight(Id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Special Service Table
CREATE TABLE SpecialService (
    Id CHAR(36) PRIMARY KEY,
    PassengerID CHAR(36) NULL,
    ServiceType VARCHAR(50) NULL,  -- Service Type: 'Wheelchair', 'Special Meal', etc.
    RequestStatus VARCHAR(20) NULL,  -- Service Request Status: 'Approved', 'Pending', 'Denied'
    ServiceNotes VARCHAR(200) NULL,
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL,
    FOREIGN KEY (PassengerID) REFERENCES Passenger(Id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Security Check Table
CREATE TABLE SecurityCheck (
    Id CHAR(36) PRIMARY KEY,
    PassengerID CHAR(36) NULL,
    CheckStatus VARCHAR(20) NULL,  -- Security Check Status: 'Passed', 'Flagged', 'Failed'
    ScreeningType VARCHAR(50) NULL,  -- Screening Type: 'X-Ray', 'Manual Check', etc.
    ScreeningNotes VARCHAR(200) NULL,
    CreateDate DATETIME NULL,
    UpdateDate DATETIME NULL,
    FOREIGN KEY (PassengerID) REFERENCES Passenger(Id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
