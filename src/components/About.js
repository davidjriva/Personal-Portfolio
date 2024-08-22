import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const About = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: '8px',
        margin: theme.spacing(2),
        boxShadow: theme.shadows[1],
        minHeight: 'calc(100vh - 250px)',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: theme.palette.text.primary,
          marginBottom: theme.spacing(2),
          textDecoration: 'underline',
        }}
      >
        About Me
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
        Driven and accomplished software engineer with a B.S. in Computer Science from Colorado
        State University, graduating summa cum laude, and a minor in Mathematics. Experienced in
        full-stack development, data engineering, and big data visualization. Proficient in data
        structures, algorithms, and mathematical applications. Passionate about elegant
        problem-solving and dedicated to maintaining high standards of excellence.
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, lineHeight: 1.6, marginTop: theme.spacing(2) }}
      >
        Thrives in a collaborative environment that values innovation and rigorous quality.
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.primary,
          marginTop: theme.spacing(3),
          textDecoration: 'underline',
        }}
      >
        Qualifications:
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
        <strong>Languages:</strong> Java, JavaScript, TypeScript, Python, C/C++, SQL, Bash, HTML,
        CSS
        <br />
        <strong>Frameworks:</strong> React, Node.js, Express.js, Mongoose, Hadoop, Apache Spark,
        PySpark
        <br />
        <strong>Testing:</strong> JUnit, Jacoco, Mockito, Postman
        <br />
        <strong>Developer Tools:</strong> MongoDB, Git, TensorFlow, Keras, Databricks, DBeaver, Pip,
        Cargo, NPM, Redshift, Amazon S3 Buckets, Zenhub, VS Code, PyCharm, IntelliJ
        <br />
        <strong>Libraries:</strong> Pandas, NumPy, Scikit-learn, Matplotlib
      </Typography>
    </Box>
  );
};

export default About;
