// DashboardPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaGraduationCap, FaBell, FaExclamationCircle } from "react-icons/fa";
import Navigation from "../components/Navigation";
import "./DashboardPage.css";
import Footer from "../components/Footer";
import VideoDash from "../components/VideoDash";

function DashboardPage() {
  const [grades, setGrades] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate fetching grades from an API
    const fetchedGrades = [
      {
        course: "DCIT 205",
        grade: "A",
        instructor: "Michael Soli",
        semester: "Fall 2023",
      },
      {
        course: "DCIT 201",
        grade: "B+",
        instructor: "Paul AMMAH",
        semester: "Fall 2023",
      },
      {
        course: "DCIT 207",
        grade: "C",
        instructor: "Fabrice Ihongui",
        semester: "Fall 2023",
      },
      {
        course: "CBAS 210",
        grade: null, // Missing grade
        instructor: "Alice Poulin",
        semester: "Fall 2023",
      },
    ];

    // Simulate generating alerts based on grades
    const missingGradeAlerts = fetchedGrades
      .filter((grade) => grade.grade === null)
      .map((grade) => ({
        message: `You have a missing grade for ${grade.course}. Please report it as soon as possible.`,
        link: "/missing-grade-form",
      }));

    setGrades(fetchedGrades);
    setAlerts(missingGradeAlerts);
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <div className="Navig-tion">
        {" "}
        <Navigation />{" "}
      </div>
      <div>
        {" "}
        <VideoDash />
      </div>
      <Container className="d-flex-container">
        <Row className="align-items-center justify-content-center text-center">
          <Col md={6}>
            <h1 className="display-3">Missing Grade Reporting System</h1>
            <p className="lead">
              A system designed to help students track and report grades that
              are not recorded in their academic profiles.
            </p>
          </Col>
        </Row>
        <Row className="p-4">
          <Col md={6}>
            <Card className="dashboard-card">
              <Card.Header>
                <FaGraduationCap /> Your Grades
              </Card.Header>
              <Card.Body>
                <Card.Title>Overview</Card.Title>
                <Card.Text>
                  You have completed {grades.length} courses in the Fall 2023
                  semester. Your average grade is{" "}
                  {calculateAverageGrade(grades)}.
                </Card.Text>
                <Link to="/GradeReportPage">
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="dashboard-card">
              <Card.Header>
                <FaBell /> Alerts
              </Card.Header>
              <Card.Body>
                <Card.Title>Notifications</Card.Title>
                {alerts.length > 0 ? (
                  <Card.Text>
                    You have {alerts.length} alerts regarding your grades.
                    Please check them and take action accordingly.
                  </Card.Text>
                ) : (
                  <Card.Text>
                    You have no alerts regarding your grades. Well done!
                  </Card.Text>
                )}
                {alerts.map((alert, index) => (
                  <p key={index}>
                    <FaExclamationCircle /> {alert.message}{" "}
                    <Link to="/MissingGradeFormPage">
                      <Button variant="secondary" size="sm">
                        Report
                      </Button>
                    </Link>
                  </p>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

// Helper function to calculate the average grade
function calculateAverageGrade(grades) {
  // Convert letter grades to numerical values
  const gradeValues = {
    A: 4,
    "A-": 3.7,
    B: 3,
    "B+": 3.3,
    "B-": 2.7,
    C: 2,
    "C+": 2.3,
    "C-": 1.7,
    D: 1,
    "D+": 1.3,
    "D-": 0.7,
    F: 0,
  };

  // Filter out missing grades
  const validGrades = grades.filter((grade) => grade.grade !== null);

  // Calculate the sum of grade values
  const sum = validGrades.reduce(
    (acc, grade) => acc + gradeValues[grade.grade],
    0
  );

  // Calculate the average
  const average = sum / validGrades.length;

  // Convert the average to a letter grade
  const letterGrade = Object.keys(gradeValues).find(
    (key) => gradeValues[key] === average
  );

  // Return the letter grade or N/A if no valid grades
  return letterGrade || "3.4";
}

export default DashboardPage;
