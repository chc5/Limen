
class Parameter(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    regexp_verifier = models.CharField(max_length=50)

    def __str__(self):
        return self.name
