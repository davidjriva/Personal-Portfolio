import { Typography } from '@mui/material';

const Skills = () => {
  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          textDecoration: 'underline',
          textAlign: 'left',
        }}
      >
        Qualifications:
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.6, textAlign: 'left' }}>
        <strong>Languages:</strong> Java, JavaScript, TypeScript, Python, C/C++, SQL, Bash, HTML, CSS
        <br />
        <strong>Frameworks:</strong> React, Node.js, Express.js, Mongoose, Hadoop, Apache Spark, PySpark
        <br />
        <strong>Testing:</strong> JUnit, Jacoco, Mockito, Postman
        <br />
        <strong>Developer Tools:</strong> MongoDB, Git, TensorFlow, Keras, Databricks, DBeaver, Pip, Cargo, NPM,
        Redshift, Amazon S3 Buckets, Zenhub, VS Code, PyCharm, IntelliJ
        <br />
        <strong>Libraries:</strong> Pandas, NumPy, Scikit-learn, Matplotlib
      </Typography>
    </div>
  );
};

export default Skills;
