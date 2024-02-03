﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Orien.PYS.Data;

#nullable disable

namespace Orien.PYS.Data.Migrations
{
    [DbContext(typeof(OrienPYSDbContext))]
    [Migration("20240203104959_AddedPhoneNumber")]
    partial class AddedPhoneNumber
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Orien.PYS.Data.Entity.CreditCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Bank_Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Card_Limit")
                        .HasColumnType("bigint");

                    b.Property<string>("Card_Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CreditCards");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.CreditCardSettlement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("AmountPaid")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CreditCardId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PaidOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CreditCardId");

                    b.ToTable("CreditCardSettlements");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.CreditCardStatement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CreditCardId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("MinimumAmountDue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("StatementDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CreditCardId");

                    b.ToTable("CreditCardStatements");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.CreditCardSummary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<long>("Available_Limit")
                        .HasColumnType("bigint");

                    b.Property<int>("CreditCardId")
                        .HasColumnType("int");

                    b.Property<long>("Outstanding_Amount")
                        .HasColumnType("bigint");

                    b.Property<long>("Unbilled_Amount")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CreditCardId");

                    b.ToTable("CreditCardSummaries");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.EmailSent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EmailSent");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.Group", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.GroupMemberRelation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<long>("GroupId")
                        .HasColumnType("bigint");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("GroupMemberRelations");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.SlipTransaction", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("AddedBy")
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PaidByUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("datetime2");

                    b.Property<long>("Slip_Id")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("SlipTransactions");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.SplitRelation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<long>("Slip_Id")
                        .HasColumnType("bigint");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("SplitRelations");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AzureID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.CreditCardSettlement", b =>
                {
                    b.HasOne("Orien.PYS.Data.Entity.CreditCard", "CreditCard")
                        .WithMany()
                        .HasForeignKey("CreditCardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreditCard");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.CreditCardStatement", b =>
                {
                    b.HasOne("Orien.PYS.Data.Entity.CreditCard", "CreditCard")
                        .WithMany()
                        .HasForeignKey("CreditCardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreditCard");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.CreditCardSummary", b =>
                {
                    b.HasOne("Orien.PYS.Data.Entity.CreditCard", "CreditCard")
                        .WithMany()
                        .HasForeignKey("CreditCardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreditCard");
                });

            modelBuilder.Entity("Orien.PYS.Data.Entity.SplitRelation", b =>
                {
                    b.HasOne("Orien.PYS.Data.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
